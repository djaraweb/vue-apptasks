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
      />
    </transition-group>
    <div class="extra-container">
      <TodoCheckAll :anyRemaining="anyRemaining" />
      <TodoItemsRemaining :remaining="remaining" />
    </div>
    <div class="extra-container">
      <TaskFiltered />
      <div>
        <transition name="fade">
          <TaskClearCompleted :showClearCompletedButton="showClearCompletedButton" />
        </transition>
      </div>
    </div>
    <div>{{todos}}</div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TaskFiltered from "./TaskFiltered";
import TaskClearCompleted from "./TaskClearCompleted";

export default {
  name: "TodoList",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TaskFiltered,
    TaskClearCompleted
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 4,
      beforeEditCache: "",
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Aprender Vue.js",
          completed: false
        },
        {
          id: 2,
          title: "Aprender react en udemy.com",
          completed: false
        },
        {
          id: 3,
          title: "Grabar leccion de Vue",
          completed: true
        }
      ]
    };
  },
  props: {
    msg: String
  },
  created() {
    eventBus.$on("removeTodo", index => {
      this.removeTodo(index);
    });
    eventBus.$on("finishedEdit", data => {
      this.finishedEdit(data);
    });
    eventBus.$on("checkedAllTodos", checked => {
      this.checkedAllTodos(checked);
    });
    eventBus.$on("filterChange", filter => {
      this.filter = filter;
    });
    eventBus.$on("clearCompletedTasks", () => {
      this.clearCompleted();
    });
  },
  beforeDestroy() {
    eventBus.$off("removeTodo", index => {
      this.removeTodo(index);
    });
    eventBus.$off("finishedEdit", data => {
      this.finishedEdit(data);
    });
    eventBus.$off("checkedAllTodos", checked => {
      this.checkedAllTodos(checked);
    });
    eventBus.$off("filterChange", filter => {
      this.filter = filter;
    });
    eventBus.$off("clearCompletedTasks", () => {
      this.clearCompleted();
    });
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
@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.5s;

  border: 1px solid rgba(197, 197, 193, 0.4);
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 8px;
}
.border-todo-item {
  border: 2px solid rgba(46, 108, 202, 0.6);
}
.btn-action {
  cursor: pointer;
  margin-left: 5px;
  color: #367fa9;
  &:hover {
    color: black;
  }
}
.hide-btn {
  display: none;
}

.inactive {
  color: gray;
}
/*.remove-item {
  cursor: pointer;
  margin-left: 5px;
  color: #367fa9;
  &:hover {
    color: black;
  }
}*/

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
  border: 0;
  /*border: 1px solid #ccc;
  border-radius: 4px;*/
  padding: 10px;
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
  margin-top: 10px;
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
