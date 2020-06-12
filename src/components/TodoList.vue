<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <TodoItem
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        class="animate__animated animate__bounce"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
        @removeTodo="removeTodo"
        @finishedEdit="finishedEdit"
      />
    </transition-group>
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!anyRemaining" @change="checkedAllTodos" /> Check All
        </label>
      </div>
      <div>{{ remaining }} items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
        <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  components: {
    TodoItem
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      beforeEditCache: "",
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Est ea nulla eiusmod voluptate ut et nulla sint.",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Excepteur laboris mollit reprehenderit aute.",
          completed: false,
          editing: false
        }
      ]
    };
  },
  props: {
    msg: String
  },

  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining !== 0;
    },
    todosFiltered() {
      if (this.filter == "all") return this.todos;
      else if (this.filter == "active")
        return this.todos.filter(todo => !todo.completed);
      else if (this.filter == "completed")
        return this.todos.filter(todo => todo.completed);
      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkedAllTodos() {
      this.todos.forEach(todo => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
.todo-input {
  display: block;
  width: 100%;
  height: 45px;
  padding: 10px 18px;
  font-size: 18px;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;

  margin-bottom: 16px;
  &:focus {
    outline: 0;
    border: 1px solid #367fa9;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.5s;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}
.todo-item-left {
  display: flex;
  align-items: center;
  width: 100%;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  display: block;
  width: 90%;
  font-size: 18px;
  color: #2c3e50;
  margin-left: 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  //font-family: "Avenir", Helvetica, arial, sans-serif;

  /*display: block;
  width: 100%;
  height: 45px;
  padding: 10px 18px;
  font-size: 18px;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;*/

  &:focus {
    outline: none;
  }
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-right: 2px;
  //btn-primary
  background-color: #4e809c;
  border-color: #367fa9;
  color: #fff;
  &:hover {
    background: #3f6074;
  }
  &:focus {
    outline: none;
  }
}
.active {
  background-color: #1e7e34;
  border-color: #1c7430;
}

//CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
