<script lang="ts">
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';

  interface ITodo {
    id: string;
    name: string;
    isDone: boolean;
  }

  let loading = true;
  const storageKey = 'todoList';

  const todos = writable<ITodo[]>([]);

  let newTodo = '';

  if (browser) {
    const loadTodos = (): ITodo[] => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (!stored) return [];
        return JSON.parse(stored) as ITodo[];
      } catch (e) {
        console.error('Failed to load todos', e);
        return [];
      }
    };

    todos.set(loadTodos());

    todos.subscribe((value) => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    });
    loading = false;
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const trimmed = newTodo.trim();
    if (trimmed === '') return;

    const newTodoItem: ITodo = {
      id: crypto.randomUUID(),
      name: trimmed,
      isDone: false,
    };

    $todos = [...$todos, newTodoItem];
    newTodo = '';
  }

  function toggleDone(id: string) {
    $todos = $todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
  }

  function deleteTodo(id: string) {
    $todos = $todos.filter((todo) => todo.id !== id);
  }
</script>

<svelte:head>
  <title>Todo list</title>
</svelte:head>

<div
  class="flex flex-col items-center justify-center min-h-screen space-y-12 bg-gray-50 px-4"
>
  <h1 class="text-3xl font-bold tracking-wider text-gray-800">My Todos</h1>

  <!-- Add Todo Form -->
  <form on:submit={handleSubmit} class="flex gap-4 w-full max-w-md">
    <input
      bind:value={newTodo}
      placeholder="Enter a new todo..."
      required
      class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition"
    />
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-lg transition"
    >
      Add
    </button>
  </form>
  {#if loading}
    <div class="text-gray-500 text-lg mt-8">
      <p>Loading your todos...</p>
    </div>
  {:else}
    <!-- Todo List -->
    {#if $todos.length > 0}
      <ul class="w-full max-w-lg space-y-3">
        {#each $todos as todo (todo.id)}
          <li
            class="flex items-center justify-between bg-white p-5 rounded-lg shadow-sm border border-gray-200 transition-all {todo.isDone
              ? 'opacity-70 bg-gray-50'
              : ''}"
          >
            <label class="flex items-center gap-4 cursor-pointer flex-1">
              <input
                type="checkbox"
                id={todo.id}
                checked={todo.isDone}
                on:change={() => toggleDone(todo.id)}
                class="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
              />
              <span
                class="{todo.isDone
                  ? 'line-through text-gray-500'
                  : 'text-gray-900'} text-lg"
              >
                {todo.name}
              </span>
            </label>

            <button
              on:click|stopPropagation={() => deleteTodo(todo.id)}
              class="text-red-600 hover:text-red-800 font-bold text-2xl leading-none"
            >
              ×
            </button>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500 text-lg">No todos</p>
    {/if}
  {/if}
</div>
