import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
const Card = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("rounded-xl border bg-card text-card-foreground shadow", className), ...props })));
Card.displayName = "Card";
export { Card };
