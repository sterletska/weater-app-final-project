<template>
  <div class="hourly-view">
    <HourlyChart
  v-if="hourly.length"
  :hourlyData="hourly"
  :isCold="weather.main.temp < 45"
/>
  </div>
</template>

<script>
import axios from 'axios';
import HourlyChart from '../components/HourlyChart.vue';

const API_KEY = '442f7fdf941089ad99cf03430cbe732f';

export default {
  props: ['weather'],
  components: { HourlyChart },
  data() {
    return {
      hourly: []
    };
  },
  async mounted() {
    if (this.weather && this.weather.coord) {
      const { lat, lon } = this.weather.coord;

    const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  );
    this.hourly = res.data.list.slice(0, 12);
      }
  }
};
</script>