<script setup>
  import { onSnapshot } from "firebase/firestore";
  import {
    deleteTodoInFirestore,
    todos_query,
    updateTodoInFirestore,
  } from "../app/firebase";
  import { storeToRefs } from "pinia";
  import { useTodoStore } from "../app/store";
  import { ref } from "vue";

  const todo_store = useTodoStore();
  const { todos } = storeToRefs(todo_store);

  async function deleteTodo(todo) {
    await deleteTodoInFirestore(todo);
  }

  async function toggleTodoAsDone(todo) {
    if (todo.todo_complete) {
      await updateTodoInFirestore({
        ...todo,
        todo_complete: false,
      });
    } else {
      await updateTodoInFirestore({
        ...todo,
        todo_complete: true,
      });
    }
  }

  await onSnapshot(todos_query, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        todo_store.todos.unshift({
          id: change.doc.id,
          ...change.doc.data(),
        });
      }
      if (change.type === "modified") {
        const todo = todo_store.todos.find((t) => t.id === change.doc.id);
        todo_store.todos[todo_store.todos.indexOf(todo)] = {
          id: change.doc.id,
          ...change.doc.data(),
        };
      }
      if (change.type === "removed") {
        const todo = todo_store.todos.find((t) => t.id === change.doc.id);
        todo_store.todos.splice(todo_store.todos.indexOf(todo), 1);
      }
    });
  });
</script>

<template>
  <div class="todoslist">
    <ol>
      <li :key="todo.id" v-for="todo in todos">
        <div class="todoitem">
          <div @click="toggleTodoAsDone(todo)" class="icon">
            <span class="material-symbols-outlined"> done </span>
          </div>
          <p class="todotitle">{{ todo.todo_title }}</p>
          || <span>{{ todo.todo_complete }}</span>
          <div @click="deleteTodo(todo)" class="icon">
            <span class="material-symbols-outlined"> close </span>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<style>
  .todoitem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .icon {
    cursor: pointer;
    border-radius: 8px;
    padding: 5px;
    border: solid 1px rgb(61, 145, 255);
  }
</style>