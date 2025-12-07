import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "strong" | "neumorphic" | "glow";
  hover?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = true, children, ...props }, ref) => {
    const variants = {
      default: "glass",
      strong: "glass-strong",
      neumorphic: "neumorphic",
      glow: "glass glow-primary",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          variants[variant],
          "rounded-2xl p-6",
          hover && "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
          className
        )}
        whileHover={hover ? { y: -5 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
