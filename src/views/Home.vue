<template>
  <v-container fluid v-if="ready">
    <v-row
      class="d-flex justify-center align-center"
      style="height: calc(100vh - 56px)"
    >
      <!-- <v-col cols="12" lg="6">
        <v-chart class="scatterChart rtl" :option="scatterChartOptions" />
      </v-col> -->

      <v-col cols="12" lg="6">
        <v-chart class="priChart rtl" :option="pirChartOptions" />
      </v-col>

      <!-- <v-col cols="12">
        <v-chart class="sankeyChart rtl" :option="sankeyChartOptions" />
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { sankeyChartOptions } from "@/components/charts/mock/sankey";
import { pirChartOptions } from "@/components/charts/mock/pie";
import { scatterChartOptions } from "@/components/charts/mock/scatter";
import "echarts";

export default Vue.extend({
  provide: {
    [THEME_KEY]: "dark",
  },
  components: {
    VChart,
  },
  mounted() {
    this.ready = true;
  },
  data(): Record<string, unknown> {
    return {
      ready: false,
      pirChartOptions,
      sankeyChartOptions,
      scatterChartOptions,
    };
  },
});
</script>

<style lang="sass" scoped>
canvas
  font-family: "IRANSansFaNum" !important

.priChart
  height: 500px

.sankeyChart
  height: 900px

.scatterChart
  height: 500px
</style>
