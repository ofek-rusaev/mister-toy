<template>
<form @change="selectGender">
  <label class="switch">
    <input type="radio" id="male" name="gender" value="male" />
    <label for="male">👦 Male</label>
    <br />
    <input type="radio" id="female" name="gender" value="female" />
    <label for="female">👩 Female</label>
    <br />
    <input type="radio" id="other" name="gender" value="other" />
    <label for="other">😈 I'd rather not say...</label>
  </label>
  </form>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return { gender: this.value };
  },
  methods: {
    selectGender(ev) {
      this.gender = ev.target.value;
      console.log('this.gender: ', this.gender);
      
      this.$emit('input', this.gender);
    }
  }
};
</script>

<style>
</style>