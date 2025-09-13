"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/useTaskStore";

export default function TaskForm({ taskToEdit = null, onClose }) {
  const addTask = useTaskStore((state) => state.addTask);
  const editTask = useTaskStore((state) => state.editTask);

  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [priority, setPriority] = useState(taskToEdit?.priority || "Low");

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (taskToEdit) {
      editTask(taskToEdit.id, { title, priority });
      onClose?.();
    } else {
      addTask({
        id: Date.now().toString(),
        title,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setTitle("");
      setPriority("Low");
    }
  };

  if (taskToEdit) {
    // Editing inside a dialog opened from TaskItem
    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          className="border p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="border p-2 w-full rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <Button className="w-full" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    );
  }

  // Normal Add Task dialog
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto mb-6">+ Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="border p-2 w-full rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <Button className="w-full" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
