<template>
  <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
</template>

<script>
export default {
  name: "task-clear-completed",
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
      //eventBus.$emit("clearCompletedTasks");
    }
  }
};
</script>
