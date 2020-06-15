<template>
  <!--
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="allChecked" /> Check All
    </label>
  </div>-->
  <div class="btn-action-checked" @click="allChecked">
    <label style="cursor: pointer">
      <input type="checkbox" :checked="!anyRemaining" v-model="checkedAll" style="display: none" />
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
  /*props: {
    anyRemaining: {
      type: Boolean,
      required: true
    }
  },*/
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    allChecked() {
      this.$store.commit("SET_CHECKED_ALL", event.target.checked);
      //this.$store.state.tasks.forEach(task => (task.completed = event.target.checked));
      //eventBus.$emit("checkedAllTasks", this.anyRemaining);
    }
  }
};
</script>
