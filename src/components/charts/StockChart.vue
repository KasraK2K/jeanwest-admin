//========================================================================================
//                                                                                                                                                                                                                                                                                                                                                       
//   ####  ######   #####    ####  ##  ##         ####  ##   ##    ###    #####    ######                                                                                                                                                                                                                                                              
//  ##       ##    ##   ##  ##     ## ##         ##     ##   ##   ## ##   ##  ##     ##                                                                                                                                                                                                                                                                
//   ###     ##    ##   ##  ##     ####          ##     #######  ##   ##  #####      ##                                                                                                                                                                                                                                                                
//     ##    ##    ##   ##  ##     ## ##         ##     ##   ##  #######  ##  ##     ##                                                                                                                                                                                                                                                                
//  ####     ##     #####    ####  ##  ##         ####  ##   ##  ##   ##  ##   ##    ##                                                                                                                                                                                                                                                                
//                                                                                                                                                                                                                                                                                                                                                       
//========================================================================================


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

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    chartData: { type: Array, required: true },
  },
  data(): Record<string, unknown> {
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
});
</script>
