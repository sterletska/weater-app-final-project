<template>
  <div class="five-day-forecast">
    <h2>5-Day Forecast</h2>
    <ForecastTable
  v-if="forecastData.length"
  :forecastData="forecastData"
  :isCold="weather.main.temp < 45"
/>
  </div>
</template>

<script>
import axios from 'axios';
import ForecastTable from '../components/ForecastTable.vue';

const API_KEY = '442f7fdf941089ad99cf03430cbe732f';

export default {
  props: ['weather'],
  components: { ForecastTable },
  data() {
    return {
      forecastData: []
    };
  },
  async mounted() {
    if (this.weather && this.weather.coord) {
      const { lat, lon } = this.weather.coord;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
      );
      // Extract the 5-day forecast data (one point per day)
      this.forecastData = res.data.list.filter((item, index) => index % 8 === 0);
      console.log(this.forecastData); // Check the fetched data
    }
  }
};
</script>

<style scoped>
.five-day-forecast {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

h2 {
  text-align: center;
  color: #383427;
}
</style>