<template>
  <div class="saved-locations" v-if="locations.length">
    
    <div class="location-list">
      <div
        class="location-item"
        v-for="(loc, index) in locations"
        :key="index"
      >
      <!-- The button emits a select event so that the parent HomePage.vue could handle that correctly -->
        <button class="loc-button" @click="$emit('select', loc)">
          {{ loc.name }}, {{ loc.country }}
        </button>
        <button class="delete-button" @click="$emit('remove', index)">✕</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['locations'],
};
</script>

<style scoped>
.saved-locations {
  margin: 30px;
  text-align: center;
}

.location-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
 }

.location-item {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.loc-button {
  background: none;
  border: none;
  color: #42494a;
  cursor: pointer;
  margin-right: 5px;
}

.delete-button {
  background: none;
  border: none;
  color: #42494a;
  font-size: 1em;
  cursor: pointer;
}

</style>
  