<template>
  <div>
    <highcharts
      :constructorType="'stockChart'"
      class="hc"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script>
export default {
  props: {
    chartData: { type: Array, required: true },
  },
  data() {
    return {
      chartOptions: {
        series: [
          {
            data: this.chartData,
          },
        ],
      },
    };
  },
};
</script>
