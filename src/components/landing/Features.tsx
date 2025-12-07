import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Brain, 
  Bell, 
  BarChart3, 
  Calendar, 
  Zap, 
  Shield,
  Sparkles,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Smart suggestions and automated task prioritization based on your habits.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Contextual notifications that adapt to your schedule and preferences.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: BarChart3,
    title: "Beautiful Analytics",
    description: "Visual insights into your productivity patterns and achievements.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Calendar,
    title: "Calendar Integration",
    description: "Seamless sync with your calendar for a unified view of your day.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance for instant task creation and updates.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "End-to-end encryption keeps your tasks and data completely safe.",
    gradient: "from-accent to-secondary",
  },
];

const Features = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Powerful Features</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="gradient-text"> Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete suite of tools designed to help you stay organized, 
            focused, and achieve your goals effortlessly.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "50K+", label: "Active Users", icon: Brain },
            { value: "2M+", label: "Tasks Completed", icon: Zap },
            { value: "99.9%", label: "Uptime", icon: Shield },
            { value: "4.9★", label: "User Rating", icon: Sparkles },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="font-display text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { Features };
