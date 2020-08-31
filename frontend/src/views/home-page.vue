<template>
  <div class="home card-grid site-block">
    <img alt="Vue logo" src="../assets/logo/logo1.png">
    <hello-world msg="Welcome to Mister Toy"/>
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/cmps/hello-world.vue'

export default {
  name: 'Home',
  components: {
    helloWorld
  }
}
</script>
