<template>
  <div>
    <button :class="{ active: filter == 'all' }" @click="changeFiltered('all')">All</button>
    <button :class="{ active: filter == 'active' }" @click="changeFiltered('active')">Active</button>
    <button
      :class="{ active: filter == 'completed' }"
      @click="changeFiltered('completed')"
    >Completed</button>
  </div>
</template>

<script>
export default {
  name: "task-filtered",
  data() {
    return {
      filter: "all"
    };
  },
  methods: {
    changeFiltered(filter) {
      this.filter = filter;
      this.$store.commit("SET_UPDATE_FILTER", filter);
      //eventBus.$emit("filterChange", filter);
    }
  }
};
</script>
