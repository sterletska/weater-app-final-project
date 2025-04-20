<template>
  <div id="searchBar" :class="isCold ? 'search-cold' : 'search-warm'">
        <input
          type="text"
          class="search-bar"
          placeholder="Enter a city..."
          v-model="city"
          @keyup.enter="submit"
        />
        <button @click="submit">Search</button>
  </div>

</template>

<script>
export default {
  props: ['isCold'], // Receive the cold/warm flag from the parent
  data() {
    return { city: '' };
  },
  
  methods: {
    submit() {
      if (this.city.trim()) {
        this.$emit('search', this.city.trim());
        this.city = '';
      }
    },
  },
};
</script>

<style>
#searchBar {
  margin: 30px 30px;
}
.search-bar {
  width: 100%;
  max-width: 60%;
  box-sizing: border-box;
  padding: 15px;
  color: rgb(22, 21, 21);
  border: none;
  outline: none;
  font-size: 1.2em;
  background-color: rgba(250, 240, 163, 0.5);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  transition: 0.4s;
}
.search-bar:focus {
  background-color: rgba(250, 240, 163, 0.8);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.search-cold .search-bar {
  background-color: rgba(200, 230, 255, 0.5);
  color: #003366;
}
button {
  padding: 15px;
  border: none;
  background-color: #f6d03a;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.2em;
 }
button:hover {
  background-color: #42494a;
}
.search-cold button {
  background-color: #b6babc;
}
.search-cold button:hover {
  background-color: #808689;
}
@media (max-width: 500px) {
  .search-bar, button {
  font-size: 1em;
  border-radius: 10px;
  }
}
</style>