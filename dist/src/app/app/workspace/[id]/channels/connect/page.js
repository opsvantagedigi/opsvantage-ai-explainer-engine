import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function ConnectChannelPage({ params }) {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    // This would redirect to the YouTube OAuth URL (to be implemented)
    return (_jsxs("div", { className: "max-w-md mx-auto py-8", children: [_jsx("h1", { className: "text-xl font-bold mb-4", children: "Connect a YouTube Channel" }), _jsxs("form", { action: `/api/youtube/oauth/start`, method: "POST", children: [_jsx("input", { type: "hidden", name: "workspaceId", value: params.id }), _jsx("button", { type: "submit", className: "bg-red-600 text-white px-4 py-2 rounded", children: "Connect with YouTube" })] })] }));
}
