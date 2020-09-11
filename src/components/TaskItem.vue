<template>
  <div class="task-item" :class="{ 'border-task-item': editing }">
    <div class="task-item-left">
      <input type="checkbox" v-model="task.completed" @change="doneEdit" style="display: none" />
      <div class="btn-action" @click="onChecked">
        <i v-if="!task.completed" class="fa fa-square-o"></i>
        <i v-else class="fa fa-check-square-o"></i>
      </div>

      <div
        v-if="!editing"
        class="task-item-label"
        :class="{ completed: task.completed }"
      >{{ task.title }}</div>
      <input
        v-else
        type="text"
        class="task-item-edit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-model="beforeEditCache"
        v-focus
      />
    </div>
    <div class="btn-action" :class="{ 'hide-btn': !editing }" @click="doneEdit">
      <i class="fa fa-check"></i>
    </div>
    <div class="btn-action" :class="{ 'hide-btn': !editing }" @click="cancelEdit">
      <i class="fa fa-close"></i>
    </div>
    <div
      class="btn-action"
      :class="{ 'hide-btn': editing, completed: task.completed }"
      @click="editTask(index)"
      style="margin-top: 1px"
    >
      <i class="fa fa-edit"></i>
    </div>
    <div
      class="btn-action"
      :class="{ 'hide-btn': editing, completed: task.completed }"
      @click="removeTask()"
    >
      <!-- &times;-->
      <i class="fa fa-trash"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "task-item",
  data() {
    return {
      editing: false,
      beforeEditCache: ""
    };
  },
  props: {
    task: {
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
        this.cancelEdit();
      }
    });
  },
  methods: {
    removeTask() {
      this.$store.dispatch("destroyTask", this.task);
    },
    editTask(index) {
      this.beforeEditCache = this.task.title;
      this.editing = true;
      eventBus.$emit("editItem", index);
    },
    doneEdit() {
      this.task.title = this.beforeEditCache;
      this.editing = false;
      this.$store.dispatch("updateTask", this.task);
    },
    cancelEdit() {
      this.editing = false;
    },
    onChecked() {
      this.task.completed = !this.task.completed;
      this.$store.dispatch("updateTask", this.task);
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.task.completed;
    }
  }
};
</script>
