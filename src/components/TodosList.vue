<script setup>
  import { onSnapshot } from "firebase/firestore";
  import { todos_collection, q } from "../app/firebase";
  import { storeToRefs } from "pinia";
  import { useTodoStore } from "../app/store";
  import { onMounted, watch } from "vue";

  const todo_store = useTodoStore();
  const { todos } = storeToRefs(todo_store);

  await onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        todo_store.todos.unshift({
          id: change.doc.id,
          ...change.doc.data(),
        });
      }
    });
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