<template>
  <div id="app">
    <HelloWorld/>
    <footer>
      2018 &copy; sentiment-analysis-webapp developers (MIT License).
      <a href="https://github.com/bighuang624/sentiment-analysis-webapp" target="_blank">Source Code</a>
    </footer>
  </div>
</template>

<script>
import HelloWorld from './components/Content'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

footer {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
</style>
