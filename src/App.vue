<template>
  <div id="app" class="container">

    <div class="card">
    <div class="card-header">
      <span>
        <i class="fa fa-tasks" />
        Admin Tasks
        <div class="pull-right">
    <img alt="Vue logo" src="./assets/logo.png" class="logo" />

        </div>
      </span>
    </div>
    <div class="card-body">
    <TaskList msg="Welcome to Your Vue.js App" />
    </div>
  </div>

    <div class="">

    </div>

  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";

export default {
  name: "App",
  components: {
    TaskList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
/*.container {
  max-width: 600px;
  margin: 0 auto;
}*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
}
.logo {
  display: block;
  /*margin: 20px auto;*/
  height: 20px;

}
</style>
