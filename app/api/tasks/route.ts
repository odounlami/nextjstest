import { NextResponse } from 'next/server';
import { tasks } from './store';

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  if (!title) return NextResponse.json({ error: 'title requis' }, { status: 400 });
  const task = { id: Date.now(), title, done: false };
  tasks.push(task);
  return NextResponse.json(task, { status: 201 });
}