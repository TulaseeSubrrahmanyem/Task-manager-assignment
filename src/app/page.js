"use client";
import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import FilterBar from "@/components/FilterBar";
import SortBar from "@/components/SortBar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <ThemeToggle />
      </div>

      {/* Add Task */}
      <TaskForm />

      {/* Filters + Sort */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <FilterBar onChange={setFilter} />
        <SortBar onChange={setSort} />
      </div>

      {/* Task List */}
      <TaskList filter={filter} sort={sort} />
    </main>
  );
}
