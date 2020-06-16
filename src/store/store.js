import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
axios.defaults.baseURL = "http://apirest-laravel.com/api/";

export const store = new Vuex.Store({
  state: {
    statusCode: 200,

    filter: "all",
    tasks: []
  },
  getters: {
    remaining(state) {
      return state.tasks.filter(task => !task.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },
    tasksFiltered(state) {
      let newTasks = [];
      if (state.filter == "all") newTasks = state.tasks;
      else if (state.filter == "active") newTasks = state.tasks.filter(task => !task.completed);
      else if (state.filter == "completed") newTasks = state.tasks.filter(task => task.completed);

      return newTasks;
    },
    showClearCompletedButton(state) {
      return state.tasks.filter(task => task.completed).length > 0;
    }
  },
  mutations: {
    SET_LIST_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    SET_CLEAR_COMPLETED(state) {
      state.tasks = state.tasks.filter(task => !task.completed);
    },
    SET_UPDATE_FILTER(state, filter) {
      state.filter = filter;
    },
    SET_CHECKED_ALL(state, checked) {
      state.tasks.forEach(task => (task.completed = checked));
    },
    SET_DELETE_TASK(state, index) {
      state.tasks.splice(index, 1);
    },
    SET_UPDATE_TASK(state, task) {
      let index = state.tasks.findIndex(item => item.id === task.id);
      state.tasks.splice(index, 1, task);
    }
  },
  actions: {
    getListTask(context) {
      axios
        .get("/tasks")
        .then(response => {
          let { data } = response;
          context.commit("SET_LIST_TASKS", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTask(context, task) {
      axios
        .post("/tasks", task)
        .then(response => {
          let { status } = response;
          if (status === 200) {
            context.dispatch("getListTask");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    destroyTask(context, task) {
      axios
        .delete("/tasks/" + task.id)
        .then(response => {
          let { status } = response;
          if (status === 200) {
            context.dispatch("getListTask");
          }
          //context.commit("SET_DELETE_TASK", data.index);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateTask(context, task) {
      axios
        .put("/tasks/" + task.id, task)
        .then(response => {
          let { data } = response;
          context.commit("SET_UPDATE_TASK", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkAll(context, checked) {
      axios
        .patch("/tasksCheckAll", {
          completed: checked
        })
        .then(response => {
          context.commit("SET_CHECKED_ALL", checked);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearCompleted({ state }) {
      const completed = store.state.tasks.filter(task => task.completed).map(task => task.id);
      axios
        .delete("/tasksDeleteCompleted", {
          data: {
            todos: completed
          }
        })
        .then(response => {
          context.commit("SET_CLEAR_COMPLETED");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
