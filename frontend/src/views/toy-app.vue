<template>
  <section class="toy-app">
    <toy-filter @set-filter="setFilter" @set-sort="setSort"></toy-filter>
    <router-view></router-view>
    <router-link to="/toy/edit" class="add">Add Toy</router-link>
    <toy-list :toys="toysToShow" @remove="remove"></toy-list>

    <section class="chat">
      <div v-if="showChat" class="chat-window">
        <button @click="changeChatStatus">x</button>
      <toy-chat-cs slot="header">We'd love to here from you!</toy-chat-cs>
      <slot>
        <pre class="chat-box">{{history}}</pre>
      </slot>
      <toy-chat-cs slot="footer">
        <input type="text" placeholder="Our support is here 24/7!" v-model="liveChat" />
        <button @click="sendLiveChat">Send</button>
      </toy-chat-cs>
      </div>

      <button @click="changeChatStatus" class="chat-btn">
        <img src="@/assets/live-chat.png" />
      </button>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import { toyService } from "../services/toy-service.js";
import toyFilter from "@/cmps/toy-filter.vue";
import toyList from "@/cmps/toy-list.vue";
import toyChatCs from "@/cmps/toy-chat-cs.vue";

import helloWorld from "@/cmps/hello-world.vue";

export default {
  name: "toy-app",
  data() {
    return {
      liveChat: null,
      history: [],
      showChat: false
    };
  },
  computed: {
    liveChatHistory() {
      var chatHistory = JSON.parse(JSON.stringify(this.liveChat));
      this.history.push(chatHistory);
      this.liveChat = '';
      setTimeout(this.CSanswer, 1000);
      return this.history;
    },
    toys() {
      return this.$store.getters.toys;
    },
    filteredToys() {
      console.log(
        "this.$store.getters.toysForDisplay: ",
        this.$store.getters.toysForDisplay
      );
      // return this.$store.getters.toysForDisplay
    },
    toysToShow() {
      return this.$store.getters.toys;
    }
  },
  created() {
    this.$store.dispatch({
      type: "loadToys"
    });
  },
  methods: {
    CSanswer() {
      this.history.push('Hello! how may I assist?')
    },
    changeChatStatus() {
      this.showChat = !this.showChat;
    },
    sendLiveChat() {
      this.liveChatHistory;
    },
    remove(toyId) {
      this.$store.dispatch({ type: "removeToy", toyId });
    },
    setFilter(filterBy) {
      console.log("FILTER BY: ", filterBy);
      this.$store.commit({
        type: "updateFilterBy",
        filterBy
      });
      this.$store.dispatch({
        type: "loadToys"
      });
    },
    setSort(sortBy) {
      console.log("SORT BY: ", sortBy);
                    
      this.$store.commit({
        type: "updateSortBy",
        sortBy
      });
      this.$store.dispatch({
        type: "loadToys"
      });
    },
    addToy() {
      this.$router.push("/toys/edit");
    }
  },
  components: {
    toyFilter,
    toyList,
    toyChatCs
  }
};
</script>