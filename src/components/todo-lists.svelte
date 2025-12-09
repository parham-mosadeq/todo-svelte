<script>
  const todos=[

  {
    id:1,
    title:"SOme random job",
    desc:"SOMSFSDFDF:SJKDF:LSKDJF",
    isComplete:false
  },
{
    id:1,
    title:"SOme random job",
    desc:"SOMSFSDFDF:SJKDF:LSKDJF",
    isComplete:true
  },{
    id:1,
    title:"SOme random job",
    desc:"SOMSFSDFDF:SJKDF:LSKDJF",
    isComplete:false
  },{
    id:1,
    title:"SOme random job",
    desc:"SOMSFSDFDF:SJKDF:LSKDJF",
    isComplete:true
  },
  ]
</script>

<div>
  <h2>here is your lists</h2>
  <ul>
   {#each todos as todo }
      <li class={`${todo.isComplete ? "done":"not-done"}`}>
        <h3>
          {todo.title}
        </h3>
        <p>
          {todo.desc}
        </p>
        isComplete:{todo.isComplete}
      </li>
      {/each}
    </ul>
</div>

<style>
  .done{
    text-decoration: line-through;
  }
  .not-done{
    text-decoration: underline;
  }
</style>