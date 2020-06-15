<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: "task-items-remaining",
  /*props: {
    remaining: {
      type: Number,
      required: true
    }
  },*/
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    }
  }
};
</script>
