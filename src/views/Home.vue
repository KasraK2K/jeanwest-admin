<template>
  <v-container fluid>
    <v-row>
      <v-col sm="6">
        <v-card>
          <v-sparkline
            :value="value"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
          ></v-sparkline>
        </v-card>
      </v-col>

      <v-col sm="6">
        <v-card>
          <StockChart :chartData="StockChartData" />
        </v-card>
      </v-col>

      <v-col sm="12">
        <v-card>
          <GanttChart :chartOptions="GanttChartOptions" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import StockChart from "@/components/charts/StockChart.vue";
import GanttChart from "@/components/charts/GanttChart.vue";

import { GanttChartOptions } from "@/mock/GanttChartOptions";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default Vue.extend({
  data(): Record<string, unknown> {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: "bottom",
      // gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,
      StockChartData: [1, 2, 3],
      GanttChartOptions,
    };
  },
  components: {
    StockChart,
    GanttChart,
  },
  methods: {
    handler() {
      var args = arguments;
      for (var arg of args) {
        if (arg instanceof Function) {
          arg();
        }
      }
    },
  },
});
</script>
