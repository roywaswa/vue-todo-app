import { defineStore } from "pinia"


export const useTodoStore = defineStore('todos', {
  state(){
    return {
      todos: []
    }
  },
  actions:{
    addTodoToStore(todo){
      this.todos.push(todo)
      // Implement connection to firebase
    },
    removeTodoFromStore(id) {
      let selectedTodo
      this.todos.forEach(todo => {
        if (todo.id == id) {
          selectedTodo = todo
        }
      })
      this.todos.slice(this.todos.indexOf(selectedTodo),1)
    }
  },
  getters:{
    
  }
})
