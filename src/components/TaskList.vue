<template>
  <div>
    <input
      type="text"
      class="task-input"
      placeholder="What needs to be done"
      v-model="newTask"
      @keyup.enter="addTask"
    />
    <div class="text-center" v-if="this.$store.getters.isLoading">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
        <TaskItem
          v-for="(task, index) in tasksFiltered"
          :key="task.id"
          :task="task"
          :index="index"
          :checkAll="!anyRemaining"
        />
    </div>
    <div class="extra-container">
      <TaskCheckAll />
      <TaskItemsRemaining />
    </div>
    <div class="extra-container">
      <TaskFiltered />
      <div>
        <transition name="fade">
          <TaskClearCompleted :showClearCompletedButton="showClearCompletedButton" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem";
import TaskItemsRemaining from "./TaskItemsRemaining";
import TaskCheckAll from "./TaskCheckAll";
import TaskFiltered from "./TaskFiltered";
import TaskClearCompleted from "./TaskClearCompleted";

export default {
  name: "TaskList",
  components: {
    TaskItem,
    TaskItemsRemaining,
    TaskCheckAll,
    TaskFiltered,
    TaskClearCompleted
  },
  data() {
    return {
      newTask: ""
    };
  },
  props: {
    msg: String
  },
  created() {
    this.$store.dispatch("getListTask");

  },
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    tasksFiltered() {
      return this.$store.getters.tasksFiltered;
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() == 0) {
        return;
      }
      this.$store.dispatch("addTask", {
        title: this.newTask,
        completed: false
      });
      this.newTask = "";
    }
  }
};
</script>

<style lang="scss">
@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

.task-input {
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
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.5s;

  border: 1px solid rgba(197, 197, 193, 0.4);
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 8px;
}
.border-task-item {
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
.btn-action-checked {
  margin-left: 12px;
  font-size: 20px;
  &:hover {
    color: #367fa9;
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

.task-item-left {
  display: flex;
  align-items: center;
  width: 100%;
}

.task-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.task-item-edit {
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
