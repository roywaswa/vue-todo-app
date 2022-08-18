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
  };
  if (process.env.NODE_ENV === "development") {
    addTodoToFirestore(fake_todo);
  } else {
    addTodoToFirestore(user_todo);
  }
}
</script>

<template>
  <div class="todo-input">
    <form @submit.prevent="addTodo">
      <div class="container">
        <label for="todo-input-field"></label>
        <input
          id="todo-input-field"
          name="todo-input-field"
          aria-label="Todo"
          type="text"
          v-model="todo.todo_title"
          placeholder="Add a new todo"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.todo-input {
  width: 100%;
  padding: 1rem;
  overflow: hidden;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

input {
  padding: 0.5rem;
  padding-inline: 1rem;
  width: 100%;
  border-radius: 100px;
  outline: none;
  border: 2px solid #c2c2c2;

  transition: all 0.3s ease-in-out;
}

input:focus {
  border: 2px solid #4481f3;
}
.container {
  width: 90%;
}
</style>
