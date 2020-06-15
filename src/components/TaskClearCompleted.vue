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
      this.$store.commit("SET_CLEAR_COMPLETED");
      //eventBus.$emit("clearCompletedTasks");
    }
  }
};
</script>
