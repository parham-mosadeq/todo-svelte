<script lang="ts">
import { writable } from 'svelte/store';
interface ITodo{
  isDone:boolean;
  name:string;
  id:string
}


const todos = writable<string[]>([]);

  let newTodo = ''

  function handleSubmit(event:SubmitEvent){
    event.preventDefault()
  }
</script>

<svelte:head>
  <title>Home</title>
  	<link rel="stylesheet" href="../index.css">

</svelte:head>

<div class="space-y-10 flex flex-col justify-center items-center w-full min-h-screen h-full">
<h1 class="text-2xl font-bold tracking-wider">See your todo's</h1>
<div class=" flex flex-col justify-center items-center w-full h-full">
  <form  on:submit={handleSubmit} class=" flex gap-3 justify-center items-center w-full h-full">
    <input bind:value={newTodo} name="todo" placeholder="Enter Your Todo" class="outline-1 outline-blue-500 rounded-md px-2 py-1 focus:outline-blue-200 transition-all duration-300"/>
    <button   type='submit' class="capitalize bg-blue-300 rounded-lg px-4 py-1.5 font-bold text-white tracking-wide cursor-pointer">
      submit
    </button>
  </form>
</div>
</div>
 
