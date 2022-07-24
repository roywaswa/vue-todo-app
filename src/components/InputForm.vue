<script setup>
  import { ref } from "vue";
  import { useTodoStore } from "../app/store";
  import { faker } from "@faker-js/faker";
  import { addTodoToFirestore } from "../app/firebase";

  const { todos, addTodoToStore } = useTodoStore();
  const todo = ref({
    todo_title: "",
    todo_complete: false,
  });

  function addTodo() {
    const fake_todo = {
      todo_title: faker.lorem.sentence(),
      todo_complete: faker.datatype.boolean(),
    };

    if (process.env.NODE_ENV === "development") {
      addTodoToFirestore(fake_todo);
    } else {
      addTodoToFirestore(todo.value);
    }
  }
</script>

<template>
  <div class="todo-input">
    <form action="POST" class="todo-input" @submit.prevent="addTodo">
      <label for="todo-field">Todo: </label>
      <input
        v-model="todo.title"
        type="text"
        name="todo-field"
        id="todo-field"
      />
      <button type="submit">ADD TODO</button>
    </form>
  </div>
</template>

<style>
</style>