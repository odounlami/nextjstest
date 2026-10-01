import { NextResponse } from 'next/server';
import { tasks } from '../store';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return NextResponse.json({ error: 'introuvable' }, { status: 404 });
  Object.assign(task, await req.json());
  return NextResponse.json(task);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const i = tasks.findIndex((t) => t.id === Number(id));
  if (i === -1) return NextResponse.json({ error: 'introuvable' }, { status: 404 });
  tasks.splice(i, 1);
  return new NextResponse(null, { status: 204 });
}