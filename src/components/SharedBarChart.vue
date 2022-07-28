<template>
  <div class="shared-bar-chart">
    <Bar
      ref="barChart"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import Zoom from 'chartjs-plugin-zoom'

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    plugins: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chartOptions: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          // zoom: {
          //   zoom: {
          //     wheel: {
          //       enabled: true,
          //       modifierKey: 'ctrl'
          //     },
          //     pinch: {
          //       enabled: true
          //     },
          //     mode: 'y',
          //   },
          //   pan: {
          //     enabled: true,
          //     mode: 'y'
          //   }
          // }
        }
      }
    }
  },
}
</script>

<style lang="scss">
.shared-bar-chart {
  &__text {
    @include text('body');
    font-weight: 600;
    text-align: left;
  }

  &__wrapper {
    height: 200rem;
  }
}
</style>