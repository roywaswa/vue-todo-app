<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../app/store'

const  todos  = useTodoStore()
const todo = ref({
  id: `${Math.random()*100*100*100000}`,
  title: 'Todo',
  isDone: false
})

function addTodo() {
  todos.addTodoToStore(todo.value)
}

</script>

<template>
  <div class="todo-input">
    <form action="POST" class="todo-input" @submit.prevent="addTodo">
      <label for="todo-field">Todo: </label>
      <input v-model="todo.title" type="text" name="todo-field" id="todo-field">
      <button type="submit" >ADD TODO</button>
    </form>
  </div>
</template>

<style>

</style>