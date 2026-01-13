import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ShortsManager from './ShortsManager';
export default function ShortsPage() {
    // TODO: replace with real workspaceId from auth/session or route params
    const workspaceId = 'opsvantage-workspace-id';
    return (_jsxs("section", { children: [_jsx("h1", { className: "text-3xl font-bold p-8", children: "Shorts Manager" }), _jsx(ShortsManager, { workspaceId: workspaceId })] }));
}
