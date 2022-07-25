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
    const user_todo = {
      ...todo.value,
    }
    if (process.env.NODE_ENV === "development") {
      addTodoToFirestore(fake_todo);
    } else {
      addTodoToFirestore(user_todo);
    }
  }
</script>

<template>
  <div class="todo-input">
    <form action="POST" class="todo-input" @submit.prevent="addTodo">
      <label hidden="true" for="todo-field">Todo</label>
      <input
        v-model="todo.todo_title"
        type="text"
        name="todo-field"
        id="todo-field"
      />
    </form>
  </div>
</template>

<style>
</style>