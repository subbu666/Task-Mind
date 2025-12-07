import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Calendar, Clock, Flag, FileText } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { useTasks, Task } from "@/contexts/TaskContext";
import { toast } from "sonner";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal = ({ isOpen, onClose }: TaskModalProps) => {
  const { addTask } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    deadline: "",
    deadlineTime: "",
    reminderTime: "2 hours before",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const deadline = formData.deadline && formData.deadlineTime
      ? new Date(`${formData.deadline}T${formData.deadlineTime}`)
      : new Date(Date.now() + 24 * 60 * 60 * 1000);

    addTask({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      deadline,
      reminderTime: formData.reminderTime,
      completed: false,
    });

    toast.success("Task created successfully! 🎉");
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      deadline: "",
      deadlineTime: "",
      reminderTime: "2 hours before",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <GlassCard variant="strong" hover={false} className="relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold">Create New Task</h2>
                <p className="text-muted-foreground mt-1">Add a new task to your workflow</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-muted/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="What needs to be done?"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-muted/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none h-24"
                    placeholder="Add more details..."
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Flag className="w-4 h-4 text-primary" />
                    Priority
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["low", "medium", "high"] as const).map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority })}
                        className={`py-3 px-4 rounded-xl border transition-all capitalize ${
                          formData.priority === priority
                            ? priority === "low"
                              ? "bg-accent/20 border-accent text-accent"
                              : priority === "medium"
                              ? "bg-primary/20 border-primary text-primary"
                              : "bg-destructive/20 border-destructive text-destructive"
                            : "bg-muted/30 border-white/10 hover:bg-muted/50"
                        }`}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Deadline Date
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full bg-muted/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.deadlineTime}
                      onChange={(e) => setFormData({ ...formData, deadlineTime: e.target.value })}
                      className="w-full bg-muted/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Reminder */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Reminder
                  </label>
                  <select
                    value={formData.reminderTime}
                    onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                    className="w-full bg-muted/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="1 day before">1 Day Before</option>
                    <option value="2 hours before">2 Hours Before</option>
                    <option value="1 hour before">1 Hour Before</option>
                    <option value="30 minutes before">30 Minutes Before</option>
                  </select>
                </div>

                {/* Submit */}
                <GlowButton type="submit" className="w-full">
                  Create Task
                </GlowButton>
              </form>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { TaskModal };
