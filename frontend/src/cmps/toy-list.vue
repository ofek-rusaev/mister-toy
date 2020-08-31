<template>
  <section>
    <h1 class="toy-list-h1">Our Toys</h1>
    <div class="toy-list">
      <toy-preview v-for="toy in toys" :toy="toy" @remove="remove" :key="toy._id"></toy-preview>
    </div>
  </section>
</template>

<script>
import toyPreview from "@/cmps/toy-preview.vue";
// import {eventBusService} from '../services/event-bus.service.js';

export default {
  name: "toy-list",
  props: {
    toys: Array
  },
  methods: {
    remove(toyId) {
      this.$emit("remove", toyId);
      // const msg = {
      //   txt: `<p>${savedToy.title} - Toy added successfully.</p>`
      // };
      // console.log('Saved!', savedToy)
      // eventBusService.$emit('show-msg', msg);
    }
  },
  components: {
    toyPreview
  }
};
</script>

<style>
</style>