<template>
  <section v-if="toy">
    <div class="toy-details">
      
    <div class="toy-img">
      <img :src="toy.url" />
    </div>
    <div class="toy-info">
      <h4>Name: {{ toy.name }}</h4>
      <div>Price: ${{ toy.price | price }}</div>
      <div>Type: {{ toy.type }}</div>
      <div>In Stock? {{ formattedInStock }}</div>
      <div>Time: {{ toy.createdAt | date }}</div>
    </div>
    </div>
    <hr/>
    <!-- <div>{{ formattedTime }}</div> -->
    <toy-chatroom></toy-chatroom>
  </section>
</template>

<script>
import { toyService } from "../services/toy-service.js";
import toyChatroom from "@/cmps/toy-chatroom.vue";
// import momentjs from 'moment';

// const moment = momentjs();

export default {
  name: "toy-details",
  data() {
    return {
      toy: null
    };
  },
  computed: {
    formattedInStock() {
      var isInStock = this.toy.inStock ? "Yes! (:" : "No, check again soon...";
      return isInStock;
    }
  },
  created() {
    // console.log(moment)
    (async () => {
      const toyId = this.$route.params.id;
      const toy = await this.$store.dispatch({
        type: "loadToy",
        toyId
      });

      this.toy = JSON.parse(JSON.stringify(toy));
      console.log(this.toy);
    })();
  },
  components: {
    toyChatroom
  }
};
</script>

<style>
</style>