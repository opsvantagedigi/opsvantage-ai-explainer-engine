"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function DashboardClient({ status }) {
    const [loading, setLoading] = useState(false);
    async function handleUpgrade() {
        try {
            setLoading(true);
            const res = await fetch("/api/billing/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId: "starter-monthly" }),
            });
            const data = await res.json();
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            }
            else {
                alert("Failed to create payment");
            }
        }
        finally {
            setLoading(false);
        }
    }
    const statusLabel = status === "active"
        ? "Pro (Active)"
        : status === "pending"
            ? "Payment Pending"
            : status === "failed"
                ? "Payment Failed"
                : "Free Tier";
    return (_jsxs("div", { className: "p-6 space-y-4", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Dashboard" }), _jsxs("div", { className: "border p-4 rounded-md space-y-2", children: [_jsxs("p", { children: ["Your subscription: ", _jsx("strong", { children: statusLabel })] }), (status === "none" || status === "failed") && (_jsx("button", { onClick: handleUpgrade, disabled: loading, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50", children: loading ? "Redirecting…" : "Upgrade to Pro" })), status === "pending" && (_jsx("p", { className: "text-yellow-600 text-sm", children: "We\u2019re waiting for payment confirmation. If you\u2019ve paid, this will update shortly." })), status === "active" && (_jsx("p", { className: "text-green-600 text-sm", children: "Thank you for being a Pro member." }))] })] }));
}
