'use client';
import { useEffect, useState } from 'react';

type Task = { id: number; title: string; done: boolean };

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  async function load() {
    const res = await fetch('/api/tasks');
    setTasks(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    load();
  }

  async function toggle(t: Task) {
    await fetch(`/api/tasks/${t.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !t.done }),
    });
    load();
  }

  async function remove(id: number) {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Tâches</h1>
      <form onSubmit={add} className="mb-4 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nouvelle tâche"
          className="flex-1 rounded border px-3 py-2"
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Ajouter</button>
      </form>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded border p-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
              <span className={t.done ? 'line-through' : ''}>{t.title}</span>
            </label>
            <button onClick={() => remove(t.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </main>
  );
}