<template>
  <div id="app" class="main-layout">
    <div id="nav" class="main-header">
      <router-link to="/">Home</router-link> |
      <router-link to="/toys">Our Toys</router-link> |
      <router-link to="/user-profile">User Profile</router-link>
    </div>
    <router-view/>
        <footer class="main-footer">
      <small>all rights reserved to toys @2020</small>
    </footer>
  </div>
</template>

<style>

</style>
