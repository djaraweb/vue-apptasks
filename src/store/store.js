import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export const store = new Vuex.Store({
  state: {
    statusCode: 200,

    filter: "all",
    tasks: [],
    isLoading: true
  },
  getters: {
    isLoading: (state) => (state.isLoading),
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
    },
    SET_LOADING(state, load) {
      state.isLoading = load;
    },
  },
  actions: {
    getListTask(context) {
      context.commit("SET_LOADING",true);
      axios
        .get("/tasks")
        .then(response => {
          let { data } = response;
          context.commit("SET_LIST_TASKS", data.body.tasks);
        })
        .catch(err => {
          console.log(err);
        }).finally(() => {
          context.commit("SET_LOADING",false);
        });
    },
    addTask(context, task) {
      context.commit("SET_LOADING",true);
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
        }).finally(() => {
          context.commit("SET_LOADING",false);
        });;
    },
    destroyTask(context, task) {
      context.commit("SET_LOADING",true);
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
        }).finally(() => {
          context.commit("SET_LOADING",false);
        });;
    },
    updateTask(context, task) {
      context.commit("SET_LOADING",true);
      axios
        .put("/tasks/" + task.id, task)
        .then(response => {
          let { data } = response;
          context.commit("SET_UPDATE_TASK", data);
        })
        .catch(err => {
          console.log(err);
        }).finally(() => {
          context.commit("SET_LOADING",false);
        });
    },
    checkAll(context, checked) {
      context.commit("SET_LOADING",true);
      axios
        .patch("/tasksCheckAll", {
          completed: checked
        })
        .then(response => {
          context.commit("SET_CHECKED_ALL", checked);
        })
        .catch(err => {
          console.log(err);
        }).finally(() => {
          context.commit("SET_LOADING",false);
        });;
    },
    clearCompleted(context) {
      context.commit("SET_LOADING",true);
      const completed = store.state.tasks.filter(task => task.completed).map(task => task.id);
      axios
        .delete("/tasksDeleteCompleted", {
          data: {
            tasks: completed
          }
        })
        .then(response => {
          context.commit("SET_CLEAR_COMPLETED");
        })
        .catch(err => {
          console.log(err);
        }).finally(() => {
          context.commit("SET_LOADING",false);
        });;
    }
  }
});
