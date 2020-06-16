<template>
  <div class="btn-action-checked">
    <label style="cursor: pointer">
      <input type="checkbox" :checked="!anyRemaining" @change="allChecked" style="display: none" />
      <i v-if="anyRemaining" class="fa fa-square-o"></i>
      <i v-else class="fa fa-check-square-o"></i>
      Check All
    </label>
  </div>
</template>

<script>
export default {
  name: "task-check-all",
  data() {
    return {
      checkedAll: false
    };
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    allChecked() {
      this.$store.dispatch("checkAll", event.target.checked);
    }
  }
};
</script>
