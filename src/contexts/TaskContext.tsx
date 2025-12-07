import { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  deadline: Date;
  reminderTime: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finalize the Q4 project proposal with budget estimates",
    priority: "high",
    deadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
    reminderTime: "2 hours before",
    completed: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Team meeting",
    description: "Weekly standup with the development team",
    priority: "medium",
    deadline: new Date(Date.now() + 5 * 60 * 60 * 1000),
    reminderTime: "1 hour before",
    completed: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Review code changes",
    description: "Review pull requests from team members",
    priority: "medium",
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    reminderTime: "1 day before",
    completed: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    priority: "low",
    deadline: new Date(Date.now() + 72 * 60 * 60 * 1000),
    reminderTime: "1 day before",
    completed: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Client presentation",
    description: "Present quarterly results to stakeholders",
    priority: "high",
    deadline: new Date(Date.now() + 48 * 60 * 60 * 1000),
    reminderTime: "2 hours before",
    completed: false,
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
