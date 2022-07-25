<template>
    <div class="appcontainer">
      <div class="header section">
        <AppHeader />
      </div>
      <div class="input section">
        <InputForm />
      </div>
      <Suspense>
        <div class="list section">
          <TodosList />
        </div>
      </Suspense>
    </div>
</template>

<script>
  import InputForm from "./components/InputForm.vue";
  import TodosList from "./components/TodosList.vue";
  import AppHeader from "./components/AppHeader.vue";

  export default {
    name: "App",

    components: {
      InputForm,
      TodosList,
      AppHeader,
    },

    data: () => ({
      //
    }),
  };
</script>

<style scoped>
  .section {
    min-height: 10vh;
    min-width: 70vw;
  }
  .appcontainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
    min-width: 70vw;
    padding-block: 1rem;
  }
  .list {
    display: flex;
    flex-grow: 1;
  }
</style>
