<template>
  <section class="toy-edit">
    <h1>Toy Edit</h1>
    <form @submit.prevent="save">
      <input required type="text" v-model.trim="editedToy.name" placeholder="Toy name" />
      <input required type="number" v-model.number="editedToy.price" placeholder="Toy price" />
      <input required type="text" v-model.trim="editedToy.type" placeholder="Toy type" />
      <input type="date" v-model="editedToy.createdAt" />
      <br />

      <label>
        <input type="checkbox" v-model="editedToy.inStock" />
        Toy in stock?
      </label>
      <br />
      <label>
        Upload toy image to cloudinary!
        <input @change="uploadImg" type="file" />
      </label>
      <br />
      <button>Save Toy</button>
    </form>

    <hr />
    <pre>{{editedToy}}</pre>
  </section>
</template>

<script>
import { toyService } from "../services/toy-service.js";
// import {eventBusService} from '../services/event-bus.service.js'

export default {
  name: "toy-edit",
  data() {
    return {
      editedToy: {
        name: "",
        price: null,
        type: "",
        createdAt: Date.now(),
        inStock: true,
        url: ''
      }
    };
  },
  created() {
    this.editToy();
  },
  methods: {
    async uploadImg(ev) {
        var img = await this.$store.dispatch({
            type: "uploadImg",
            ev
        })
        this.editedToy.url = img;
        
    },
    async editToy() {
      const toyId = this.$route.params.id;
      if (toyId) {
        const toy = await this.$store.dispatch({
          type: "loadToy",
          toyId
        });
        this.editedToy = JSON.parse(JSON.stringify(toy));
      }
    },
    save() {
      this.$store.dispatch({
        type: "saveToy",
        toy: this.editedToy
      });
      this.$router.push("/toys");
    }
  }
};
</script>

<style>
</style>