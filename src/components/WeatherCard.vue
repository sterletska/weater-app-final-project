<template>
 <div :class="['weather-card', isCold ? 'cold' : 'warm']" v-if="weather">
    <h2 v-if="weather.name">{{ weather.name }}<span v-if="weather.state">, {{ weather.state }}</span>, {{ weather.country }}</h2><br>
    <p class="temp">{{ Math.round(weather.main.temp) }}°F</p>
    <br><br>
    <p class="extremes">High: {{ Math.round(weather.main.temp_max) }}°F</p>
    <p class="extremes">Low: {{ Math.round(weather.main.temp_min) }}°F</p>
  </div>
</template>

<script>
export default {
  props: ['weather'],
  computed: {
    locationName() {
      const city = this.weather.name;
      const country = this.weather.sys.country;
      return `${city}, ${country}`;
    },
    
    isCold() {
      return this.weather && this.weather.main.temp < 45;
    }
  },
};
</script>

<style scoped>

.weather-card {
  text-align: center;
}
h2 {
  color: #f6d03a;
  font-size: 2.5em;
  font-weight: 600;
  text-shadow: 1px 2px rgba(106, 81, 6, 0.25);
  max-width: 70%;
  margin: 0 auto;
}
.cold h2{
 color: #606b6d;
}
.temp {
  display: inline-block;
  padding: 5px 40px;
  color: #ffffff;
  font-size: 4em;
  font-style: italic;
  font-weight: 400;
  background-color: rgba(250, 240, 163, 0.3);
  border-radius: 10px;
  margin-top: 20px;
  text-shadow: 2px 4px rgba(106, 81, 6, 0.25);
}
.cold .temp {
  color: #65d3fb;
  background-color: rgba(215, 226, 249, 0.7);
  font-weight: 600;
  text-shadow: 1px 2px rgba(106, 81, 6, 0.25);
}
.extremes {
  color: #f6d03a;
  font-size: 1.7em;
  font-style: italic;
  font-weight: 400;
  text-shadow: 1px 2px rgba(106, 81, 6, 0.25);
}
.cold .extremes{
  color: #42494a;
}

</style>