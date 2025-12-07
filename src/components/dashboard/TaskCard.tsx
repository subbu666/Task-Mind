import { motion } from "framer-motion";
import { Task, useTasks } from "@/contexts/TaskContext";
import { Check, Clock, Flag, Trash2, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  const { toggleComplete, deleteTask } = useTasks();
  const [timeLeft, setTimeLeft] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const deadline = new Date(task.deadline);
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Overdue");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        setTimeLeft(`${days}d ${hours % 24}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [task.deadline]);

  const handleComplete = () => {
    toggleComplete(task.id);
    if (!task.completed) {
      setShowConfetti(true);
      toast.success("Task completed! 🎉");
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };

  const handleDelete = () => {
    deleteTask(task.id);
    toast.success("Task deleted");
  };

  const priorityColors = {
    low: "priority-low",
    medium: "priority-medium",
    high: "priority-high",
  };

  const priorityGlow = {
    low: "shadow-[0_0_20px_hsla(157,100%,81%,0.3)]",
    medium: "shadow-[0_0_20px_hsla(211,100%,65%,0.3)]",
    high: "shadow-[0_0_20px_hsla(0,84%,60%,0.3)]",
  };

  const isOverdue = timeLeft === "Overdue" && !task.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 30 }}
      className={`glass rounded-2xl p-5 group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
        task.completed ? "opacity-60" : ""
      } ${!task.completed && priorityGlow[task.priority]}`}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                background: ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"][i % 3],
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -200, opacity: 0 }}
              transition={{ duration: 1, delay: i * 0.05 }}
            />
          ))}
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleComplete}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 ${
            task.completed
              ? "bg-gradient-to-br from-primary to-secondary border-transparent"
              : "border-white/20 hover:border-primary/50"
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-primary-foreground" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className={`font-semibold text-lg leading-tight ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Time left */}
              <div
                className={`flex items-center gap-1.5 text-sm ${
                  isOverdue ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className={isOverdue ? "font-semibold" : ""}>{timeLeft}</span>
              </div>

              {/* Reminder */}
              <div className="text-sm text-muted-foreground hidden sm:block">
                {task.reminderTime}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {!task.completed && timeLeft !== "Overdue" && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
          <motion.div
            className={`h-full ${
              task.priority === "high"
                ? "bg-destructive"
                : task.priority === "medium"
                ? "bg-primary"
                : "bg-accent"
            }`}
            initial={{ width: "100%" }}
            animate={{ width: "30%" }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
};

export { TaskCard };
