<template>
  <form @submit.prevent="selectTime">
      <input type="number" min=0 max=12 >
      <input type="number" min=0 max=59 >
      <select name="" id="" >
          <option value="am">AM</option>
          <option value="pm">PM</option>
      </select>
      <button>h</button>
  </form>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return { time: this.value };
  },
  methods: {
    selectTime(ev) {
        // console.log('THIS VALUE : ', ev.target.elements);
      this.time = {
          hr: ev.target.elements[0].value,
          min: ev.target.elements[1].value,
          ampm: ev.target.elements[2].value

      }
    //   console.log('this.time: ', this.time);
      this.$emit('input', this.time);
    }
  },
  created(){
    //   console.log(this.time,'value');
      
  }
};
</script>

<style>
</style>