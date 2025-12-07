import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full p-1 transition-all duration-500 glass border border-white/10 hover:border-white/20"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={false}
        animate={{
          background: theme === "dark" 
            ? "linear-gradient(135deg, hsl(222 47% 11%), hsl(262 30% 15%))"
            : "linear-gradient(135deg, hsl(45 100% 85%), hsl(30 100% 90%))"
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Stars for dark mode */}
      {theme === "dark" && (
        <>
          <motion.div
            className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute top-3 left-4 w-0.5 h-0.5 bg-white/40 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        </>
      )}

      {/* Sun rays for light mode */}
      {theme === "light" && (
        <motion.div
          className="absolute right-1.5 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-0.5 bg-amber-500 rounded-full"
              style={{
                transform: `rotate(${i * 45}deg) translateX(12px)`,
                transformOrigin: "center",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            />
          ))}
        </motion.div>
      )}

      {/* Toggle knob */}
      <motion.div
        className="relative w-6 h-6 rounded-full flex items-center justify-center z-10"
        initial={false}
        animate={{
          x: theme === "dark" ? 0 : 24,
          background: theme === "dark" 
            ? "linear-gradient(135deg, hsl(222 47% 20%), hsl(222 47% 15%))"
            : "linear-gradient(135deg, hsl(45 100% 65%), hsl(35 100% 55%))",
          boxShadow: theme === "dark"
            ? "0 0 20px hsla(262 100% 72% / 0.4), inset 0 1px 1px hsla(0 0% 100% / 0.2)"
            : "0 0 20px hsla(45 100% 60% / 0.5), inset 0 1px 1px hsla(0 0% 100% / 0.5)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30,
          background: { duration: 0.3 }
        }}
      >
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === "dark" ? 0 : 360,
            scale: 1
          }}
          transition={{ duration: 0.5 }}
        >
          {theme === "dark" ? (
            <Moon className="w-3.5 h-3.5 text-secondary" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-800" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export { ThemeToggle };
