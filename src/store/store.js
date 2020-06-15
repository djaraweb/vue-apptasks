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
      if (state.filter == "all") return state.tasks;
      else if (state.filter == "active") return state.tasks.filter(task => !task.completed);
      else if (state.filter == "completed") return state.tasks.filter(task => task.completed);
      return state.tasks;
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
    getListTask(contex) {
      axios
        .get("/tasks")
        .then(response => {
          let { data } = response;
          contex.commit("SET_LIST_TASKS", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTask(contex, task) {
      axios
        .post("/tasks", task)
        .then(response => {
          let { data } = response;
          contex.commit("SET_ADD_TASK", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    destroyTask(contex, data) {
      axios
        .delete("/tasks/" + data.task.id)
        .then(response => {
          let { data } = response;
          contex.commit("SET_DELETE_TASK", data.index);
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
          contex.commit("SET_UPDATE_TASK", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
