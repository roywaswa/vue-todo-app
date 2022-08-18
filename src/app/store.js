import { defineStore } from 'pinia'
// import { } from ''

export const useTodoStore = defineStore('todos', {
  state () {
    return {
      todos: []
    }
  },
  actions: {
    async addTodoToStore (todo) {
      this.todos.push(todo)
    },
    removeTodoFromStore (id) {
      let selectedTodo
      this.todos.forEach((todo) => {
        if (todo.id == id) {
          selectedTodo = todo
        }
      })
      this.todos.slice(this.todos.indexOf(selectedTodo), 1)
    }
  },
  getters: {}
})
