<template>
  <v-container
    fluid
    v-if="ready"
  >
    <v-row>
      <v-col cols="12">
        <v-chart
          class="priChart rtl"
          :option="pirChartOptions"
        />
      </v-col>

      <v-col cols="12">
        <v-chart
          class="sankeyChart rtl"
          :option="sankeyChartOptions"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { sankeyData } from "@/components/charts/mock/sankey";
import VChart, { THEME_KEY } from "vue-echarts";
import "echarts";

const pirChartOptions = {
  textStyle: {
    fontFamily: "IRANSans",
  },
  dispatchAction: {
    type: "dataZoom",
    start: 20,
    end: 30,
  },
  title: {
    text: "منابع ترافیکی",
    left: "center",
    top: "10%",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: [
      "مستقیم",
      "پست الکترونیک",
      "شبکه‌های تبلیغاتی",
      "تبلیغات ویدیویی",
      "موتورهای جستجو",
    ],
  },
  series: [
    {
      name: "منابع ترافیکی",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "مستقیم" },
        { value: 310, name: "پست الکترونیک" },
        { value: 234, name: "شبکه‌های تبلیغاتی" },
        { value: 135, name: "تبلیغات ویدیویی" },
        { value: 1548, name: "موتورهای جستجو" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

const sankeyChartOptions = {
  textStyle: {
    fontFamily: "IRANSans",
  },
  title: {
    text: "نمودار انرژی",
    left: "center",
    top: "5%",
  },
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
  },
  series: [
    {
      type: "sankey",
      left: "5%",
      top: "10%",
      right: "20%",
      bottom: "5%",
      data: sankeyData.nodes,
      links: sankeyData.links,
      emphasis: {
        focus: "adjacency",
      },
      lineStyle: {
        color: "gradient",
        curveness: 0.5,
      },
    },
  ],
};

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
    };
  },
});
</script>

<style scoped>
.priChart {
  height: 400px;
}

.sankeyChart {
  height: 900px;
}
</style>
