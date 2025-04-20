<template>
  <div :class="['hourly-chart', isCold ? 'cold' : 'warm']" v-if="hourlyData && hourlyData.length">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  props: ['hourlyData', 'isCold'],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    hourlyData() {
      this.renderChart();
    },
    isCold() {
      this.renderChart(); // re-render when temperature style changes
    }
  },
  methods: {
    renderChart() {
      if (!this.hourlyData || !this.$refs.chartCanvas) return;

      const ctx = this.$refs.chartCanvas.getContext('2d');

      // Destroy previous chart instance
      if (this.chart) {
        this.chart.destroy();
      }

      const labels = this.hourlyData.slice(0, 12).map(hour =>
        new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit' })
      );

      const temps = this.hourlyData.slice(0, 12).map(hour => hour.main.temp);

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Temp (°F)',
            data: temps,
            borderColor: this.isCold ? '#7b8386' : '#f6d03a',
            backgroundColor: this.isCold ? 'rgba(123,131,134, 0.2)' : 'rgba(246, 208, 58, 0.2)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
              }
          },
          scales: {
            x: {
              ticks: {
                color: this.isCold ? '#42494a' : 'white'
              }
            },
            y: {
              ticks: {
                color: this.isCold ? '#42494a' : 'white',
                callback: val => `${val}°F`
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.hourly-chart {
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  padding: 16px;
  width: 70%;
  margin: 0 auto;
}

.hourly-chart.warm {
  background-color: rgba(250, 240, 163, 0.1);
  color: white;
}

.hourly-chart.cold {
  background-color: rgba(201, 217, 251, 0.3);
  color: #42494a;
}

canvas {
  width: 100% !important;
  height: auto !important;
}
 @media (max-width: 1668px) {
  .hourly-chart {
  width: 90%;}
 }



</style>