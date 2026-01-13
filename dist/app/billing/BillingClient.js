"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function BillingClient({ latest, history, status, }) {
    const [loading, setLoading] = useState(false);
    async function retryPayment(planId) {
        try {
            setLoading(true);
            const res = await fetch("/api/billing/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId }),
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
        ? "Active"
        : status === "pending"
            ? "Pending Confirmation"
            : status === "failed"
                ? "Payment Failed"
                : "No Active Subscription";
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Manage Subscription" }), _jsxs("div", { className: "border rounded-lg p-5 shadow-sm bg-white space-y-3", children: [_jsx("h2", { className: "text-lg font-medium", children: "Current Subscription" }), _jsxs("p", { className: "text-gray-700", children: ["Status: ", _jsx("strong", { children: statusLabel })] }), latest && (_jsxs("p", { className: "text-gray-600 text-sm", children: ["Plan: ", _jsx("strong", { children: latest.planId }), " \u2014", " ", (latest.amountCents / 100).toFixed(2), " ", latest.currency] })), (status === "none" || status === "failed") && (_jsx("button", { onClick: () => retryPayment("starter-monthly"), disabled: loading, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50", children: loading ? "Redirecting…" : "Upgrade to Pro" })), status === "pending" && (_jsx("button", { onClick: () => retryPayment(latest.planId), disabled: loading, className: "px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50", children: loading ? "Redirecting…" : "Retry Payment" })), status === "active" && (_jsx("p", { className: "text-green-600 text-sm", children: "Your subscription is active. Thank you for supporting OpsVantage." }))] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-medium", children: "Billing History" }), history.length === 0 && (_jsx("p", { className: "text-gray-500 text-sm", children: "No billing history yet. Upgrade to get started." })), history.map((s) => {
                        const simple = s.status === "active"
                            ? "Active"
                            : s.status === "pending"
                                ? "Pending"
                                : s.status === "failed" || s.status === "cancelled"
                                    ? "Failed"
                                    : "None";
                        return (_jsxs("div", { className: "border rounded-lg p-4 shadow-sm bg-white space-y-2", children: [_jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: s.planId }), " \u2014", " ", (s.amountCents / 100).toFixed(2), " ", s.currency] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Status: ", _jsx("strong", { children: simple })] }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Created: ", new Date(s.createdAt).toLocaleDateString()] })] }, s.id));
                    })] })] }));
}
