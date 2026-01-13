import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function NewWorkspacePage() {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    // UI for creating a new workspace (form submission handled client-side)
    return (_jsxs("div", { className: "max-w-md mx-auto py-8", children: [_jsx("h1", { className: "text-xl font-bold mb-4", children: "Create New Workspace" }), _jsxs("form", { action: "/app/api/workspace/create", method: "POST", className: "space-y-4", children: [_jsx("input", { name: "name", placeholder: "Workspace Name", className: "w-full border p-2 rounded", required: true }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded", children: "Create" })] })] }));
}
