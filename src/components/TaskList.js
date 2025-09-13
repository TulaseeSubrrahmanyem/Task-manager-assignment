"use client";
import { useTaskStore } from "@/store/useTaskStore";
import TaskItem from "./TaskItem";

export default function TaskList({ filter, sort }) {
  const tasks = useTaskStore((state) => state.tasks);

  // Filter
  let filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // Sort
  const order = { High: 3, Medium: 2, Low: 1 };
  filtered = [...filtered].sort((a, b) => {
    if (sort === "priority") return order[b.priority] - order[a.priority];
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  return (
    <div>
      {filtered.length > 0 ? (
        filtered.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500 text-center">No tasks found</p>
      )}
    </div>
  );
}
