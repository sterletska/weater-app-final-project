<template>
  <div class="forecast-table">
    <div class="table-wrapper">
      <table :class="isCold ? 'cold-theme' : 'warm-theme'">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp (°F)</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(forecast, index) in forecastData" :key="index">
            <td>{{ new Date(forecast.dt * 1000).toLocaleDateString() }}</td>
            <td>{{ Math.round(forecast.main.temp) }}°F</td>
            <td>
              <div class="weather-icon">
                <img :src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png'" alt="weather icon" />
                {{ forecast.weather[0].description.split(' ').length > 1 ? forecast.weather[0].description.split(' ')[1] : forecast.weather[0].description }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['forecastData', 'isCold'],

isCold() {
      this.renderChart(); // re-render when temperature when style changes
    }
}

</script>

<style scoped>
.forecast-table {
  margin-top: 20px;
  padding: 16px;
  background-color: rgba(250, 240, 163, 0.1);;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #383427;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.2em;
}

th, td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.cold-theme th {
  background-color: rgba(123, 131, 134, 0.822);
}
.warm-theme th {
  background-color: rgba(246, 208, 58, 0.6);
  color: #383427;
}

.cold-theme tr:nth-child(even) {
  background-color: rgba(123, 131, 134, 0.6);
}
.cold-theme tr:nth-child(odd) {
  background-color: rgba(123, 131, 134, 0.3);
}
.warm-theme tr:nth-child(even) {
  background-color: rgba(246, 208, 58, 0.6);
  color: white;
}
.warm-theme tr:nth-child(odd) {
  background-color: rgba(246, 208, 58, 0.3);
  color: white;
}

.weather-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.weather-icon img {
  width: 30px;
  height: 30px;
}
.weather-icon img {
  width: 50px;  
  height: 50px; 
  }
  @media (max-width: 470px) {
  .table-wrapper {
  width: 100%;
  overflow-x: auto;
}
.weather-icon img {
  display: none; 
  }
table {
  font-size: 1em;
}}
</style>