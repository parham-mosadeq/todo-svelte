<script lang="ts">
  type Todo = {
    title: string;
    desc: string;
    isCompleted: boolean;
  };

  // reactive state
  let todos = $state<Todo[]>([]);
  let newTodo = $state(""); // bind input value

  function submitTodo() {
    if (!newTodo.trim()) return;

    todos = [
      ...todos,
      {
        title: newTodo,
        desc: "",
        isCompleted: false
      }
    ];

    newTodo = ""; // clear input
  }
</script>

<h1>Todo List</h1>

<div>
  <input bind:value={newTodo} placeholder="Enter todo..." />
  <button on:click={submitTodo}>Add</button>
</div>

<!-- render todos -->
<ul>
  {#each todos as todo}
    <li>{todo.title}</li>
  {/each}
</ul>
