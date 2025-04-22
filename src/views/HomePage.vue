<template>
 <body>
  <SearchBar @search="searchCity" :isCold="isCold" /> <!-- passing isCold from the parent. This allows the search bar background to adapt based on the temperature -->
  
  <SavedLocations
      :locations="savedLocations"
      @select="selectSaved"
      @remove="(i) => $emit('remove-location', i)"
    />
    <WeatherCard v-if="weather" :weather="weather" />
  <div
    v-if="weather"
    class="weather-condition"
    :class="isCold ? 'cold-theme' : 'warm-theme'"
  >
    <img
      :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'"
      alt="weather icon"
      class="condition-icon"
    />
    <span>{{ currentCondition }}</span>
</div>
 </body> 
  
</template>

<script>
import axios from 'axios';
import SearchBar from '../components/SearchBar.vue';
import WeatherCard from '../components/WeatherCard.vue';
import SavedLocations from '../components/SavedLocations.vue';

const API_KEY = '442f7fdf941089ad99cf03430cbe732f';

export default {
  props: ['weather', 'savedLocations'],
  components: { SearchBar, WeatherCard, SavedLocations },

  computed: {
    isCold() {
      return this.weather && this.weather.main && this.weather.main.temp < 45;
    },
    currentCondition() {
      if (
        this.weather &&
        this.weather.weather &&
        this.weather.weather[0] &&
        this.weather.weather[0].description
      ) {
        const description = this.weather.weather[0].description;
    return description
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return '';
}
  },
  //searchCity(city) method Gets city coordinates from the OpenWeather geolocation API.Gets the weather based on lat/lon. Emits the result to update weather and saved locations.

  methods: {
    async searchCity(city) {
  const geoRes = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );

  const location = geoRes.data[0];

  if (!location) return;

  const { lat, lon, name, state, country } = location;

  const weatherRes = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  );

  
  const weatherData = {
    ...weatherRes.data,
    name,     
    state,    
    country,  
  };

  this.$emit('update-weather', weatherData);
  this.$emit('save-location', weatherData);
    },
    selectSaved(location) {
  
  const cityQuery = `${location.name},${location.state || ''},${location.country}`;
  this.searchCity(cityQuery);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Poppins', sans-serif;
}
.weather-condition {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  margin-top: 16px;
  padding: 10px 20px;
  font-weight: 500;
  text-shadow: 2px 4px 4px rgba(106, 81, 6, 0.25);
}

/* Shared icon styling */
.condition-icon {
  width: 50px;
  height: 50px;
}

/* Theme-specific styles */
.warm-theme {
  color: #f6d03a;
}

.cold-theme {
  color: #42494a;
}
</style>