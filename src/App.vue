<template>
  <div id="app" :class="isCold ? 'cold' : ''">
    <nav :class="isCold ? 'nav-cold' : 'nav-warm'">
      <router-link to="/">Home</router-link>
      <router-link to="/hourly">Hourly</router-link>
      <router-link :to="{ name: 'FiveDayForecast', params: { weather: currentWeather } }">5-Day Forecast</router-link>
    </nav>
  <main>
  
    <router-view
        :weather="weather"
        :saved-locations="savedLocations"
        @update-weather="updateWeather"
        @save-location="saveLocation"
        @remove-location="removeLocation"
        @select-location="selectSaved"
      />
</main>
</div>
</template>

<script>
export default {
  data() {
    return {
      weather: null,
      savedLocations: [],
    };
  },
  computed: {
    isCold() {
      return this.weather?.main?.temp < 45;
    },
  },
  
  methods: {
    updateWeather(data) {
      this.weather = data;
    },
    saveLocation(location) {
      if (!this.savedLocations.some((loc) => loc.name === location.name)) {
        this.savedLocations.push(location);
      }
    },
    removeLocation(index) {
      this.savedLocations.splice(index, 1);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background-image: url('@/assets/sunset.jpg');
  background-size: cover;
  background-position: top;
  transition: 0.4s;
}
#app.cold {
  background-image: url('@/assets/winter.jpg');
}
nav.nav-warm {
  background-color: rgba(246, 208, 58, 0.6); 
}

nav.nav-cold {
  background-color: rgba(123,131,134, 0.5); 
}

nav {
  padding: 15px 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: background-color 0.4s;
}

nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  
  padding: 20px 30px;
  transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #383427;
}

nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.3);
  color: #383427;
  font-weight: 600;
}
/* Hide active background when any other link is hovered */
nav:hover a.router-link-active:not(:hover) {
  background-color: transparent;
  color: #fff;
}

@media (max-width: 493px) {
  nav {
    text-align: left;
  }
  nav a {
    display: block;
  }
}
</style>