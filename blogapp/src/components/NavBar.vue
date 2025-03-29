<template>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/create">Add Post</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  };
  </script>
  
  <style>
  nav {
    display: flex;
    gap: 15px;
    background: #333;
    padding: 10px;
  }
  nav a {
    font-size: 27px;
    color: white;
    text-decoration: none;
  }
  </style>
  