import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { TaskProvider, useTasks } from "@/contexts/TaskContext";
import { 
  Brain, 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft
} from "lucide-react";

const CalendarContent = () => {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty slots for days before the first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getTasksForDay = (day: number) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.deadline);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingOrbs />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 px-4 py-4">
        <div className="container mx-auto max-w-7xl">
          <div className="glass-strong rounded-2xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-bold hidden sm:block">TaskMind</span>
              </Link>
            </div>

            <h1 className="font-display text-lg font-semibold">Calendar View</h1>

            <div className="w-24" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-6xl px-4 py-8 relative z-10">
        {/* Calendar Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={previousMonth}
            className="p-3 rounded-xl glass hover:bg-white/10 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-3 rounded-xl glass hover:bg-white/10 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard hover={false} className="overflow-hidden">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-px bg-white/5 mb-4">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center py-3 text-sm font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dayTasks = getTasksForDay(day);
                const isToday =
                  day === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear();

                return (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className={`aspect-square rounded-xl p-2 transition-all hover:bg-white/10 cursor-pointer ${
                      isToday ? "bg-primary/20 ring-2 ring-primary" : "bg-muted/20"
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayTasks.slice(0, 2).map((task) => (
                        <div
                          key={task.id}
                          className={`text-xs truncate rounded px-1 py-0.5 ${
                            task.priority === "high"
                              ? "bg-destructive/20 text-destructive"
                              : task.priority === "medium"
                              ? "bg-primary/20 text-primary"
                              : "bg-accent/20 text-accent"
                          }`}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayTasks.length - 2} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-6 mt-6"
        >
          {[
            { label: "High", color: "bg-destructive" },
            { label: "Medium", color: "bg-primary" },
            { label: "Low", color: "bg-accent" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

const CalendarPage = () => {
  return (
    <TaskProvider>
      <CalendarContent />
    </TaskProvider>
  );
};

export default CalendarPage;
