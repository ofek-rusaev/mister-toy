<template>
  <div class="user-profile">
    <h1>Welcome to your profile</h1>
    <!-- <form @submit.prevent="setUserInfo"> -->
      <gender-picker v-model="userInfo.gender"></gender-picker>
      <time-picker v-model="userInfo.time"></time-picker>
      <!-- <div v-for="(pref, key) in userInfo" :key="key"> -->
        <p>{{showGender}}</p>
        <p>{{showTime}}</p>
      <!-- </div> -->
      <!-- <pre>{{userInfo}}</pre> -->
      <!-- <pre>Selected gender: {{showGender}}</pre> -->
      <!-- <pre>Selected time: {{showTime}}</pre> -->
      <!-- <p>Selected time: {{time.hr}}:{{time.min}} {{time.ampm}}</p> -->
      
    <!-- </form> -->
  </div>
</template>

<script>
import genderPicker from '@/cmps/gender-picker.vue';
import timePicker from '@/cmps/time-picker.vue';
import colorPicker from '@/cmps/color-picker.vue';

export default {
  data() {
    return {
      userInfo: {
        gender: '',
        time: {hr: '', min: '', ampm: ''},
        color: ''
      }
    };
  },
  computed: {
    showGender() {
      return this.userInfo.gender;
    },
    showTime() {
      if (!this.userInfo.time) {
        return ''
      } else {
        return `${this.userInfo.time.hr} : ${this.userInfo.time.min} ${this.userInfo.time.ampm}`
      }
    }
  },
  methods: {
    setUserInfo() {
      console.log('saving.. ', this.userInfo);
    }
  },
  components: {
    genderPicker,
    timePicker
  }
};
</script>

<style>
</style>
