export type Task = { id: number; title: string; done: boolean };

const g = globalThis as unknown as { tasks?: Task[] };
export const tasks: Task[] = (g.tasks ??= [
  { id: 1, title: 'Premier', done: false },
]);