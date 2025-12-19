import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

// Simple in-memory storage (resets on server restart)
let todos: string[] = [];

console.log('=== SERVER FILE LOADED – ACTIONS READY ===');

export const actions: Actions = {
  addTodo: async ({ request }) => {
    const formData = await request.formData();
    const todo = formData.get('todo')?.toString().trim();

    if (!todo) {
      return fail(400, { error: 'Todo cannot be empty' });
    }

    todos.push(todo);
    console.log('Todos now:', todos);

    throw redirect(303, '/');
  },
};

// Make todos available to the page
export const load = () => {
  return { todos };
};
