import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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

  // TODO: If NowPayments supports HMAC or a signature header, verify here using NOWPAYMENTS_IPN_SECRET.

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
