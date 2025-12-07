import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TaskModal } from "@/components/dashboard/TaskModal";
import { TaskProvider, useTasks } from "@/contexts/TaskContext";
import { 
  Brain, 
  Plus, 
  LayoutGrid, 
  List, 
  Filter,
  Calendar,
  Sparkles,
  Search,
  LogOut
} from "lucide-react";

const DashboardContent = () => {
  const { tasks } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<"list" | "kanban">("list");
  const [filter, setFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.priority === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingOrbs />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 px-4 py-4">
        <div className="container mx-auto max-w-7xl">
          <div className="glass-strong rounded-2xl px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold hidden sm:block">TaskMind</span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full bg-muted/30 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <GlowButton variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </GlowButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                {getGreeting()}, <span className="gradient-text">Lokesh</span>
              </h1>
              <p className="text-muted-foreground mt-1">Let's make today productive!</p>
            </div>
            
            <GlowButton onClick={() => setIsModalOpen(true)}>
              <Plus className="w-5 h-5" />
              Add Task
            </GlowButton>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
        >
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("list")}
              className={`p-2.5 rounded-xl transition-all ${
                view === "list" ? "bg-primary text-primary-foreground" : "glass hover:bg-white/10"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`p-2.5 rounded-xl transition-all ${
                view === "kanban" ? "bg-primary text-primary-foreground" : "glass hover:bg-white/10"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <Link to="/calendar" className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all">
              <Calendar className="w-5 h-5" />
            </Link>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-2">
              {(["all", "low", "medium", "high"] as const).map((priority) => (
                <button
                  key={priority}
                  onClick={() => setFilter(priority)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                    filter === priority
                      ? priority === "low"
                        ? "bg-accent/20 text-accent"
                        : priority === "medium"
                        ? "bg-primary/20 text-primary"
                        : priority === "high"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Task List */}
        <AnimatePresence mode="popLayout">
          {view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {sortedTasks.length > 0 ? (
                sortedTasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))
              ) : (
                <GlassCard className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">No tasks found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? "Try a different search term" : "Create your first task to get started!"}
                  </p>
                  <GlowButton onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Create Task
                  </GlowButton>
                </GlassCard>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="kanban"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {/* Kanban columns */}
              {(["low", "medium", "high"] as const).map((priority) => {
                const priorityTasks = sortedTasks.filter((t) => t.priority === priority && !t.completed);
                return (
                  <div key={priority}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-3 h-3 rounded-full ${
                        priority === "low" ? "bg-accent" : priority === "medium" ? "bg-primary" : "bg-destructive"
                      }`} />
                      <h3 className="font-display font-semibold capitalize">{priority} Priority</h3>
                      <span className="text-muted-foreground text-sm">({priorityTasks.length})</span>
                    </div>
                    <div className="space-y-4">
                      {priorityTasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <GlassCard className="overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Smart Suggestions</h3>
                <p className="text-sm text-muted-foreground">AI-powered productivity tips</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Focus on high-priority tasks first thing in the morning",
                "Take a 5-minute break every 25 minutes (Pomodoro)",
                "Review and plan tomorrow's tasks before ending today",
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-muted/30 rounded-xl p-4 border border-white/5"
                >
                  <Sparkles className="w-4 h-4 text-accent mb-2" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </main>

      {/* Floating Add Button (Mobile) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary-md z-40 md:hidden"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const Dashboard = () => {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
};

export default Dashboard;
