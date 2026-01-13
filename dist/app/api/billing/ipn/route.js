import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
function mapNowPaymentsStatus(status) {
    switch (status) {
        case "finished":
            return "active";
        case "waiting":
        case "confirming":
        case "partially_paid":
            return "pending";
        case "failed":
        case "expired":
        case "refunded":
        case "chargeback":
            return "failed";
        default:
            return null;
    }
}
export async function POST(req) {
    try {
        const body = (await req.json());
        if (!body.order_id || !body.payment_status) {
            return NextResponse.json({ error: "Invalid IPN payload" }, { status: 400 });
        }
        const mapped = mapNowPaymentsStatus(body.payment_status);
        if (!mapped) {
            // Unknown/irrelevant status → acknowledge but ignore
            return NextResponse.json({ ok: true }, { status: 200 });
        }
        const sub = await prisma.subscription.findFirst({
            where: {
                provider: "nowpayments",
                providerOrderId: body.order_id,
            },
        });
        if (!sub) {
            // No subscription found for this order_id; acknowledge to avoid retries
            return NextResponse.json({ ok: true }, { status: 200 });
        }
        await prisma.subscription.update({
            where: { id: sub.id },
            data: {
                status: mapped,
                // Optional: startedAt/expiresAt could be set here if you have plan durations
            },
        });
        // Optional: Audit log (if AuditLog model exists)
        // await prisma.auditLog.create({
        //   data: {
        //     userId: sub.userId,
        //     action: "subscription_ipn",
        //     metadata: {
        //       provider: "nowpayments",
        //       orderId: body.order_id,
        //       paymentStatus: body.payment_status,
        //     },
        //   },
        // });
        return NextResponse.json({ ok: true }, { status: 200 });
    }
    catch (err) {
        console.error("IPN handler error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
