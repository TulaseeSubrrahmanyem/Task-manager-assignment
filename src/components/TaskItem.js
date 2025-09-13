"use client";
import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import TaskForm from "./TaskForm";

export default function TaskItem({ task }) {
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm mb-3 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3">
        {/* Completion Checkbox with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{task.completed ? "Unmark as active" : "Mark as completed"}</p>
          </TooltipContent>
        </Tooltip>

        <div>
          <p
            className={`font-medium ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </p>
          {/* Priority Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={`inline-block mt-1 text-xs px-2 py-1 rounded cursor-default ${
                  task.priority === "High"
                    ? "bg-red-200 text-red-700"
                    : task.priority === "Medium"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-green-200 text-green-700"
                }`}
              >
                {task.priority}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Priority: {task.priority}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex gap-2">
        {/* Edit Button */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} disabled={task.completed}>
            Edit
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <TaskForm taskToEdit={task} onClose={() => setIsEditing(false)} />
          </DialogContent>
        </Dialog>

        {/* Delete Button */}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
