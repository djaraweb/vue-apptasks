<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: "task-items-remaining",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>
