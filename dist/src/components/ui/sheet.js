import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function Sheet({ children }) {
    return _jsx("div", { children: children });
}
export function SheetTrigger({ children }) {
    return _jsx("span", { children: children });
}
export function SheetContent({ className, ...props }) {
    return _jsx("div", { className: cn("fixed right-0 top-0 h-full w-80 bg-background shadow-lg z-50", className), ...props });
}
