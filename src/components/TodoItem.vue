<template>
  <div class="todo-item" :class="{'border-todo-item': editing}">
    <div class="todo-item-left">
      <input type="checkbox" v-model="todo.completed" @change="doneEdit" style="display: none" />
      <div class="btn-action" @click="onChecked">
        <i v-if="!todo.completed" class="fa fa-square-o"></i>
        <i v-else class="fa fa-check-square-o"></i>
      </div>

      <div
        v-if="!editing"
        class="todo-item-label"
        :class="{ completed: todo.completed }"
      >{{ todo.title }}</div>
      <input
        v-else
        type="text"
        class="todo-item-edit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-model="beforeEditCache"
        v-focus
      />
    </div>
    <div class="btn-action" :class="{'hide-btn': !editing}" @click="doneEdit">
      <i class="fa fa-check"></i>
    </div>
    <div class="btn-action" :class="{'hide-btn': !editing}" @click="cancelEdit">
      <i class="fa fa-close"></i>
    </div>
    <div
      class="btn-action"
      :class="{'hide-btn': editing, 'completed': todo.completed}"
      @click="editTodo(index)"
      style="margin-top: 1px"
    >
      <i class="fa fa-edit"></i>
    </div>
    <div
      class="btn-action"
      :class="{'hide-btn': editing, 'completed': todo.completed}"
      @click="removeTodo(index)"
    >
      <!-- &times;-->
      <i class="fa fa-trash"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "todo-item",
  data() {
    return {
      editing: false,
      beforeEditCache: ""
    };
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus;
      }
    }
  },
  created() {
    eventBus.$on("editItem", index => {
      if (this.index != index) {
        //console.log("Discarding:", this.index);
        this.cancelEdit();
      }
    });
  },
  methods: {
    removeTodo(index) {
      eventBus.$emit("removeTodo", index);
    },
    editTodo(index) {
      this.beforeEditCache = this.todo.title;
      this.editing = true;
      //console.log("Editing:", index);
      //console.log("before:", this.beforeEditCache);
      eventBus.$emit("editItem", index);
    },
    doneEdit() {
      //console.log("done:", this.todo.title);
      this.todo.title = this.beforeEditCache;
      this.editing = false;
      eventBus.$emit("finishedEdit", {
        index: this.index,
        todo: this.todo
      });
    },
    cancelEdit() {
      this.editing = false;
    },
    onChecked() {
      this.todo.completed = !this.todo.completed;
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  }
};
</script>
