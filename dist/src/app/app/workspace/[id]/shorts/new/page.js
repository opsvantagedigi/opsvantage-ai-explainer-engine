import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function NewShortPage({ params }) {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    return (_jsxs("div", { className: "max-w-md mx-auto py-8", children: [_jsx("h1", { className: "text-xl font-bold mb-4", children: "Generate AI Explainer Short" }), _jsxs("form", { action: `/api/ai-explainer`, method: "POST", className: "space-y-4", children: [_jsx("input", { type: "hidden", name: "workspaceId", value: params.id }), _jsx("input", { name: "title", placeholder: "Short Title", className: "w-full border p-2 rounded", required: true }), _jsx("textarea", { name: "prompt", placeholder: "Describe the topic or paste a YouTube link...", className: "w-full border p-2 rounded", rows: 4, required: true }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded", children: "Generate" })] })] }));
}
