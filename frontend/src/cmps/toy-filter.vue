<template>
  <section class="toy-filter">
    <!-- <h3>Filter Toys</h3> -->
    <div class="toy-filter1">

    <input type="text" placeholder="Start typing toy's title.." v-model="filterBy.name" />
    <p>Availability:</p>
    <select v-model="filterBy.inStock" title="Filter by availability">
      <option>All</option>
      <option>In stock</option>
      <option>Out of stock</option>
    </select>
    <p>Category:</p>
    <select v-model="filterBy.type" title="Filter by category">
      <option>All</option>
      <option>Funny</option>
      <option>Educational</option>
      <option>Adult</option>
    </select>
    </div>

    <hr />
    <div class="toy-filter2">
    <button @click="emitSort('name')">Sort by name</button>
    <button @click="emitSort('price')">Sort by price</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'toy-filter',
  data() {
    return {
      filterBy: { name: '', type: '', inStock: '' },
      // sortBy: ''
    };
  },
  watch: {
    filterBy: {
      handler() {
        let filter = JSON.parse(JSON.stringify(this.filterBy));
        this.emitFilter(filter);
      },
      deep: true
    }
  },
  methods: {
    emitFilter(filter) {
      // console.log('TOY-FILTER-CMP: filter - ', filter);
      if (filter.type === 'All') filter.type = '';
      if (filter.inStock === 'All') filter.inStock = '';
      this.$emit('set-filter', filter);
    },
    emitSort(sortBy) {
      // console.log('TOY-FILTER-CMP: sort - ', sort);
      this.$emit('set-sort', sortBy);
    }
  }
};
</script>

<style>
</style>