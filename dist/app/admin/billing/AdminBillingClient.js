"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function AdminBillingClient({ subs }) {
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Admin \u00B7 Billing Overview" }), subs.length === 0 && (_jsx("p", { className: "text-gray-500 text-sm", children: "No subscriptions found." })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: subs.map((s) => {
                    const statusColor = s.status === "active"
                        ? "text-green-600"
                        : s.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600";
                    return (_jsxs("div", { className: "border rounded-lg p-4 shadow-sm bg-white space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("p", { className: "font-medium", children: s.planId }), _jsx("span", { className: `text-sm font-semibold ${statusColor}`, children: s.status.toUpperCase() })] }), _jsxs("p", { className: "text-sm text-gray-700", children: ["User: ", _jsx("strong", { children: s.user?.name ?? "—" })] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Email: ", s.user?.email ?? "—"] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Amount: ", (s.amountCents / 100).toFixed(2), " ", s.currency] }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Created: ", new Date(s.createdAt).toLocaleDateString()] })] }, s.id));
                }) })] }));
}
