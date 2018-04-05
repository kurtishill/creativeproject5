<template>
  <div id="app">
    <app-header/>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader';
  import AppFooter from './components/AppFooter';
  export default {
    name: 'App',
    components: { AppHeader,AppFooter }
  }
</script>

<style>
  body {
    font-family: 'Itim', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .header {
    margin: 2%;
  }

  h1 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1rem;
  }

  .flexWrapper {
     display:flex;
  }

  .flexRight {
     margin-left: auto;
  }

  .error {
     color: #F35537;
     padding: 5px;
  }

  button {
     color: #fff;
     min-width: 100px;
     line-height: 1em;
     border: none;
     border-radius: 5px;
     color: white;
     padding: 10px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 1.2rem;
     margin: 4px 2px;
     text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
     background: rgb(66, 184, 221);
  }

  button:active {
     transform: translateY(4px);
  }

  button:hover {
     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
     cursor: pointer;
  }

  input {
     height: 20px;
     padding: 10px;
  }

  .blue-button {
    background: rgb(66, 184, 221);
  }

  .quiz {
    margin: 5%;
    text-align: center;
  }

  .nav-button {
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    background: rgb(66, 184, 221);
    width: 100px;
    height: 45px;
  }

  .start-div {
    text-align: center;
  }

  .choice-button {
    width: 200px;
    background: #f3f3f3;
    color: black;
    border: 1px solid black;
    font-family: inherit;
  }

  .choice-button:focus {
    background: #26E807;
  }

  hr {
    width: 90%;
  }

  @media (min-width: 1200px) {
    h1 {
      font-size: 3rem;
    }

    h3 {
      font-size: 1.7rem;
    }

    h5 {
      font-size: 1.2rem;
    }

    hr {
      margin-left: 100px;
      margin-right: 300px;
      width: 60%;
    }
  }
</style>
