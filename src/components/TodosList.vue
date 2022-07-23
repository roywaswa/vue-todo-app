<script setup>
  import { storeToRefs } from "pinia";
  import { useTodoStore } from "../app/store";

  const store = useTodoStore();
  const { todos } = storeToRefs(store);

</script>

<template>
  <div class="todoslist">
    <ol>
      <li :key="todo.id" v-for="todo in todos">
        <p>{{ todo.title }}</p>
      </li>
    </ol>
  </div>
</template>