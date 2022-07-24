<script setup>
import InputForm from './components/InputForm.vue';
import TodosList from './components/TodosList.vue';

</script>

<template>
  <h1>TODO APP</h1>
  <InputForm/>
  <Suspense>
    <TodosList/>
  </Suspense>
</template>

<style>

</style>
