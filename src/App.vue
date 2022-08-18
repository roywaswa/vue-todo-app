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
  <div class="techstack">
    <div class="icon">
      <VueIcon />
    </div>
    <div class="icon">
      <FirebaseIcon />
    </div>
  </div>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import TodosList from "./components/TodosList.vue";
import AppHeader from "./components/AppHeader.vue";
import VueIcon from "./components/icons/VueIcon.vue";
import FirebaseIcon from "./components/icons/FirebaseIcon.vue";

export default {
  name: "App",

  components: {
    InputForm,
    TodosList,
    AppHeader,
    VueIcon,
    FirebaseIcon,
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
.techstack {
  cursor: pointer;
  opacity: 0.7;
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background: rgb(201, 201, 201);
  border-radius: 100px;
  padding: 0.5rem;
}
.techstack:hover {
  opacity: 1;
}
.icon {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  background: white;
  border-radius: 100px;
}
</style>
