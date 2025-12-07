import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useTasks } from "@/contexts/TaskContext";
import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from "lucide-react";

const StatsCards = () => {
  const { tasks } = useTasks();

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;
  const overdue = tasks.filter((t) => {
    const deadline = new Date(t.deadline);
    return !t.completed && deadline < new Date();
  }).length;
  const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

  const stats = [
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      gradient: "from-accent to-primary",
      color: "text-accent",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      gradient: "from-primary to-secondary",
      color: "text-primary",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      gradient: "from-destructive to-secondary",
      color: "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Progress Ring Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="flex items-center gap-6">
          <ProgressRing progress={progress} size={100} strokeWidth={10}>
            <div className="text-center">
              <div className="font-display text-2xl font-bold gradient-text">{progress}%</div>
              <div className="text-xs text-muted-foreground">Done</div>
            </div>
          </ProgressRing>
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm">Today's Progress</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {completed} of {tasks.length} tasks completed
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stat Cards */}
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <GlassCard className="relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className={`font-display text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </div>
            <div className="text-muted-foreground">{stat.label}</div>
            
            {/* Decorative glow */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl`} />
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

export { StatsCards };
