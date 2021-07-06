export const pirChartOptions = {
  textStyle: {
    fontFamily: "IRANSansFaNum",
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
