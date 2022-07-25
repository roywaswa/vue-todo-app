<script setup>
  import { onSnapshot } from "firebase/firestore";
  import {
    deleteTodoInFirestore,
    todos_query,
    updateTodoInFirestore,
  } from "../app/firebase";
  import { storeToRefs } from "pinia";
  import { useTodoStore } from "../app/store";

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
  <div class="container">
    <TransitionGroup name="list">
      <div
        :key="todo.id"
        v-for="todo in todos"
        class="todo-card"
        :class="{ done_card: todo.todo_complete }"
      >
        <span
          @click="toggleTodoAsDone(todo)"
          v-if="todo.todo_complete"
          class="material-symbols-outlined done_icon"
        >
          task_alt
        </span>
        <span
          @click="toggleTodoAsDone(todo)"
          v-else
          class="material-symbols-outlined"
        >
          radio_button_unchecked
        </span>
        <p class="todotitle">{{ todo.todo_title }}</p>
        <span
          @click="deleteTodo(todo)"
          class="material-symbols-outlined danger"
        >
          delete
        </span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
  .list-enter-active,
  .list-move,
  .list-leave-active {
    transition: all 1s ease-in-out;
  }
  .list-enter-from,
  .list-leave-to {
    transform: translateX(-100px);
    opacity: 0;
  }

  .list-leave-active {
    position: absolute;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 1rem;
    /* margin-block: 1rem; */
    /* height: max-content; */
  }
  .todo-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #f5f5f5;
    transition: all 0.2s ease-in-out;
  }
  .todotitle {
    min-width: 70%;
    font-size: 1.2rem;
    font-weight: 500;
    padding-inline: 1rem;
  }
  .material-symbols-outlined {
    cursor: pointer;
    padding: 0.3rem;
    font-size: 1.5rem;
    color: #888;
  }
  .done_card {
    background-color: #cfcfcf;
    color: #888;
  }
  .done_card > p {
    text-decoration: line-through;
  }
  .danger {
    color: #ff0000;
  }
  .done_icon {
    color: #008cff;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    background: rgba(192, 192, 250, 0.548);
    padding: 1px;
    border-radius: 100vw;
  }
  ::-webkit-scrollbar-thumb {
    background: #008cff8e;
    border-radius: 100vw;
    border: 1px solid rgb(192, 192, 250);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #008cff;
  }
</style>