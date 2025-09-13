import { create } from "zustand";

// Zustand task store with localStorage persistence
export const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  toggleComplete: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  editTask: (id, updatedFields) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      ),
    })),
}));

// Persistence
useTaskStore.subscribe((state) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }
});

// Load from localStorage on startup
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    useTaskStore.setState({ tasks: JSON.parse(saved) });
  }
}
