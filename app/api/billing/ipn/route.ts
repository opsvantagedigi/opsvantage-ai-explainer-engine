import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: Request) {
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET
  if (!ipnSecret) {
    return new NextResponse("IPN not configured", { status: 500 })
  }

  const rawBody = await req.text()
  let payload: any

  try {
    payload = JSON.parse(rawBody)
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 })
  }

  // Verify HMAC signature if present
  const sigHeader =
    (req.headers.get("x-nowpayments-signature") || req.headers.get("x-nowpayments-sig") || req.headers.get("x-nowpayments-hmac") || req.headers.get("x-signature")) as string | null

  if (sigHeader) {
    try {
      const secret = ipnSecret
      const hmac = crypto.createHmac("sha256", secret).update(rawBody).digest()
      const hex = hmac.toString("hex")
      const b64 = hmac.toString("base64")

      const normalized = sigHeader.replace(/^sha256=(.+)$/i, "$1").replace(/^sha256:/i, "")

      if (normalized !== hex && normalized !== b64) {
        return new NextResponse("Invalid signature", { status: 401 })
      }
    } catch (err) {
      return new NextResponse("Signature verification failed", { status: 401 })
    }
  } else {
    // If no signature header present, require that an IPN secret still exists and proceed
    // (We already check ipnSecret presence above.)
  }

  const paymentStatus = payload.payment_status as string | undefined
  const orderId = payload.order_id as string | undefined
  const paymentId = payload.payment_id as string | undefined

  if (!orderId || !paymentStatus) {
    return new NextResponse("Missing fields", { status: 400 })
  }

  let newStatus: string | null = null
  switch (paymentStatus.toLowerCase()) {
    case "finished":
      newStatus = "active"
      break
    case "partially_paid":
    case "waiting":
      newStatus = "pending"
      break
    case "failed":
    case "expired":
      newStatus = "failed"
      break
    default:
      newStatus = null
  }

  if (!newStatus) {
    return new NextResponse("Ignored status", { status: 200 })
  }

  // Update subscriptions matching the external order id
  await (prisma as any).subscription.updateMany({
    where: { nowOrderId: orderId },
    data: {
      status: newStatus,
      updatedAt: new Date(),
      nowOrderId: paymentId ? orderId : undefined,
    },
  })

  return new NextResponse("OK", { status: 200 })
}
