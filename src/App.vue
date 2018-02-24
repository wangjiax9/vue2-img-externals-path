<template>
  <div id="app">
    <img src="./images/logo.png">
    <div class="dd"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.dd{
  width:300px;
  height:100px;
  background: url('./images/rank-top-bg_03.png') no-repeat
}
</style>
