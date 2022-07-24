<script setup>
  import {  getDocs } from "firebase/firestore";
  import { getTodosFromFirestore, todos_collection } from "../app/firebase";
  import { storeToRefs } from "pinia";
  import { useTodoStore } from "../app/store";
  import { onMounted, watch } from "vue";

  const store = useTodoStore();
  const { todos } = storeToRefs(store);

  onMounted(async () => {
    console.log("mounted");
    todos.value = await getTodosFromFirestore();
  });
</script>

<template>
  <div class="todoslist">
    <ol>
      <li :key="todo.id" v-for="todo in todos">
        <p>{{ todo.todo_title }}</p>
      </li>
    </ol>
  </div>
</template>