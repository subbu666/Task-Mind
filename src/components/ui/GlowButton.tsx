import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, useState, ReactNode, MouseEvent } from "react";

interface GlowButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", size = "md", glow = true, children, onClick, disabled, type = "button" }, ref) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.(e);
    };

    const variants = {
      primary: "bg-gradient-to-r from-primary to-secondary text-primary-foreground",
      secondary: "bg-secondary/20 text-secondary border border-secondary/30",
      accent: "bg-gradient-to-r from-accent to-primary text-accent-foreground",
      ghost: "bg-white/5 text-foreground border border-white/10 hover:bg-white/10",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "relative overflow-hidden rounded-xl font-semibold transition-all duration-300",
          variants[variant],
          sizes[size],
          glow && variant === "primary" && "glow-primary hover:glow-primary-md",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        whileHover={!disabled ? { scale: 1.05 } : undefined}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        onClick={handleClick}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
            }}
          />
        ))}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton };
