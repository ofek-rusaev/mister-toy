<template>
<section class="toy-preview">
  <!-- <div> -->
  <img :src="toy.url" />
  <!-- </div> -->
  <div class="toy-preview-info">
  <h2 :class="classObj">{{toy.name}}</h2>
  <h4>Category: {{toy.type}}</h4>
  <h4>Price:  ${{ toy.price | price }}</h4>
  <router-link :to="editLink">Edit</router-link>|
  <router-link :to="detailsLink">Details</router-link>|
  <button @click="remove(toy._id)">x</button>
  </div>
</section>
</template>

<script>
export default {
  name: 'toy-preview',
  props: ['toy'],
  computed: {
    editLink() {
      return 'toy/edit/' + this.toy._id;
    },
    detailsLink() {
      return 'toy/' + this.toy._id;
    },
    classObj() {
      return { done: this.toy.isDone };
    }
  },
  methods: {
    remove(toyId) {
      this.$emit('remove', toyId);
    }
  }
};
</script>

<style>
</style>