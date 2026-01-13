import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function TooltipProvider({ children }) {
    return _jsx(_Fragment, { children: children });
}
export function Tooltip({ children }) {
    return _jsx("span", { children: children });
}
export function TooltipTrigger({ children }) {
    return _jsx("span", { children: children });
}
export function TooltipContent({ className, ...props }) {
    return _jsx("div", { className: cn("absolute z-20 rounded bg-black text-white p-2 text-xs", className), ...props });
}
