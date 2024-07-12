import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        secondary:
          "border-transparent bg-amber-100 text-amber-900 hover:bg-amber-200 focus:ring-amber-400",
        outline:
          "border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
