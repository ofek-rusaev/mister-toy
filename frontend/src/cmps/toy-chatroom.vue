<template>
  <section class="toy-chatroom">
    <h2>Toy's chatroom</h2>
    <div class="chat-window">
      <div class="typing-output">{{typing}}</div>
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">{{msg.from}} : {{msg.txt}}</li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input @input="sendTypingMsg" type="text" v-model="msg.txt" />
      <button>Send</button>
    </form>
      
    </div>
  </section>
</template>

<script>
import socketService from '@/services/socket-service';
import userService from '@/services/user-service';

export default {
  data() {
    return {
      msg: { from: '', txt: '' },
      msgs: [],
      topic: this.$route.params.id,
      typing: ''
    };
  },
  created() {
    this.getUser();
    socketService.setup();
    socketService.emit('chat topic', this.topic);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('typing', this.setTyping);
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg);
    socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.typing = '';
      this.msgs.push(msg);
    },
    sendMsg() {
      socketService.emit('chat newMsg', this.msg);
      this.msg.txt = '';
    },
    sendTypingMsg() {
      socketService.emit('typing', this.msg.from);
    },
    setTyping(data) {
      this.typing = `${data} is typing...`
    },
    changeTopic() {
      socketService.emit('chat topic', this.topic);
    },
    getUser() {
      const nickname = userService.getNickname();
      this.msg.from = nickname;
    }
  },
  watch: {
    topic() {
      // console.log('Topic Changed', this.topic);
    },
    'msg.txt'() {
      socket.on('Typing', sender => {
        this.setTypingMsg(sender);
      })
      // console.log('MSG CHANGED');
    },
    msgs: {
      handler() {
        // console.log('New msg arrival!');
      }
    }
  }
};
</script>

<style>
</style>