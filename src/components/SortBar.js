"use client";

export default function SortBar({ onChange }) {
  return (
    <select
      className="border rounded px-3 py-2 text-sm"
      onChange={(e) => onChange(e.target.value)}
      defaultValue="newest"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="priority">Priority</option>
    </select>
  );
}
