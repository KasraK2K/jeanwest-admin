const sankeyData = {
  nodes: [
    {
      name: "زباله های کشاورزی",
    },
    {
      name: "تبدیل زیستی",
    },
    {
      name: "مایع",
    },
    {
      name: "تلفات",
    },
    {
      name: "جامد",
    },
    {
      name: "گاز",
    },
    {
      name: "واردات سوخت زیستی",
    },
    {
      name: "واردات زیست توده",
    },
    {
      name: "واردات زغال سنگ",
    },
    {
      name: "ذغال سنگ",
    },
    {
      name: "ذخایر ذغال سنگ",
    },
    {
      name: "گرمایش منطقه ای",
    },
    {
      name: "صنعت",
    },
    {
      name: "گرمایش و سرمایش - تجاری",
    },
    {
      name: "گرمایش و سرمایش - منازل",
    },
    {
      name: "شبکه برق",
    },
    {
      name: "بیش از تولید / صادرات",
    },
    {
      name: "تبدیل H2",
    },
    {
      name: "حمل و نقل جاده ای",
    },
    {
      name: "کشاورزی",
    },
    {
      name: "حمل و نقل ریلی",
    },
    {
      name: "روشنایی و لوازم خانگی - تجاری",
    },
    {
      name: "روشنایی و لوازم خانگی - خانه ها",
    },
    {
      name: "واردات گاز",
    },
    {
      name: "نگاس",
    },
    {
      name: "ذخایر گاز",
    },
    {
      name: "تولید حرارتی",
    },
    {
      name: "ژئوترمال",
    },
    {
      name: "H2",
    },
    {
      name: "هیدرو",
    },
    {
      name: "حمل و نقل بین المللی",
    },
    {
      name: "هواپیمایی داخلی",
    },
    {
      name: "هواپیمایی بین المللی",
    },
    {
      name: "ناوبری ملی",
    },
    {
      name: "جلبک های دریایی",
    },
    {
      name: "اتمی",
    },
    {
      name: "واردات روغن",
    },
    {
      name: "روغن",
    },
    {
      name: "ذخایر نفتی",
    },
    {
      name: "زباله های دیگر",
    },
    {
      name: "گرمای پمپ شده",
    },
    {
      name: "خورشیدی PV",
    },
    {
      name: "خورشیدی حرارتی",
    },
    {
      name: "خورشیدی",
    },
    {
      name: "جزر و مدی",
    },
    {
      name: "انرژی زیستی مستقر در انگلستان",
    },
    {
      name: "موج",
    },
    {
      name: "باد",
    },
  ],
  links: [
    {
      source: "زباله های کشاورزی",
      target: "تبدیل زیستی",
      value: 124.729,
    },
    {
      source: "تبدیل زیستی",
      target: "مایع",
      value: 0.597,
    },
    {
      source: "تبدیل زیستی",
      target: "تلفات",
      value: 26.862,
    },
    {
      source: "تبدیل زیستی",
      target: "جامد",
      value: 280.322,
    },
    {
      source: "تبدیل زیستی",
      target: "گاز",
      value: 81.144,
    },
    {
      source: "واردات سوخت زیستی",
      target: "مایع",
      value: 35,
    },
    {
      source: "واردات زیست توده",
      target: "جامد",
      value: 35,
    },
    {
      source: "واردات زغال سنگ",
      target: "ذغال سنگ",
      value: 11.606,
    },
    {
      source: "ذخایر ذغال سنگ",
      target: "ذغال سنگ",
      value: 63.965,
    },
    {
      source: "ذغال سنگ",
      target: "جامد",
      value: 75.571,
    },
    {
      source: "گرمایش منطقه ای",
      target: "صنعت",
      value: 10.639,
    },
    {
      source: "گرمایش منطقه ای",
      target: "گرمایش و سرمایش - تجاری",
      value: 22.505,
    },
    {
      source: "گرمایش منطقه ای",
      target: "گرمایش و سرمایش - منازل",
      value: 46.184,
    },
    {
      source: "شبکه برق",
      target: "بیش از تولید / صادرات",
      value: 104.453,
    },
    {
      source: "شبکه برق",
      target: "گرمایش و سرمایش - منازل",
      value: 113.726,
    },
    {
      source: "شبکه برق",
      target: "تبدیل H2",
      value: 27.14,
    },
    {
      source: "شبکه برق",
      target: "صنعت",
      value: 342.165,
    },
    {
      source: "شبکه برق",
      target: "حمل و نقل جاده ای",
      value: 37.797,
    },
    {
      source: "شبکه برق",
      target: "کشاورزی",
      value: 4.412,
    },
    {
      source: "شبکه برق",
      target: "گرمایش و سرمایش - تجاری",
      value: 40.858,
    },
    {
      source: "شبکه برق",
      target: "تلفات",
      value: 56.691,
    },
    {
      source: "شبکه برق",
      target: "حمل و نقل ریلی",
      value: 7.863,
    },
    {
      source: "شبکه برق",
      target: "روشنایی و لوازم خانگی - تجاری",
      value: 90.008,
    },
    {
      source: "شبکه برق",
      target: "روشنایی و لوازم خانگی - خانه ها",
      value: 93.494,
    },
    {
      source: "واردات گاز",
      target: "نگاس",
      value: 40.719,
    },
    {
      source: "ذخایر گاز",
      target: "نگاس",
      value: 82.233,
    },
    {
      source: "گاز",
      target: "گرمایش و سرمایش - تجاری",
      value: 0.129,
    },
    {
      source: "گاز",
      target: "تلفات",
      value: 1.401,
    },
    {
      source: "گاز",
      target: "تولید حرارتی",
      value: 151.891,
    },
    {
      source: "گاز",
      target: "کشاورزی",
      value: 2.096,
    },
    {
      source: "گاز",
      target: "صنعت",
      value: 48.58,
    },
    {
      source: "ژئوترمال",
      target: "شبکه برق",
      value: 7.013,
    },
    {
      source: "تبدیل H2",
      target: "H2",
      value: 20.897,
    },
    {
      source: "تبدیل H2",
      target: "تلفات",
      value: 6.242,
    },
    {
      source: "H2",
      target: "حمل و نقل جاده ای",
      value: 20.897,
    },
    {
      source: "هیدرو",
      target: "شبکه برق",
      value: 6.995,
    },
    {
      source: "مایع",
      target: "صنعت",
      value: 121.066,
    },
    {
      source: "مایع",
      target: "حمل و نقل بین المللی",
      value: 128.69,
    },
    {
      source: "مایع",
      target: "حمل و نقل جاده ای",
      value: 135.835,
    },
    {
      source: "مایع",
      target: "هواپیمایی داخلی",
      value: 14.458,
    },
    {
      source: "مایع",
      target: "هواپیمایی بین المللی",
      value: 206.267,
    },
    {
      source: "مایع",
      target: "کشاورزی",
      value: 3.64,
    },
    {
      source: "مایع",
      target: "ناوبری ملی",
      value: 33.218,
    },
    {
      source: "مایع",
      target: "حمل و نقل ریلی",
      value: 4.413,
    },
    {
      source: "جلبک های دریایی",
      target: "تبدیل زیستی",
      value: 4.375,
    },
    {
      source: "نگاس",
      target: "گاز",
      value: 122.952,
    },
    {
      source: "اتمی",
      target: "تولید حرارتی",
      value: 839.978,
    },
    {
      source: "واردات روغن",
      target: "روغن",
      value: 504.287,
    },
    {
      source: "ذخایر نفتی",
      target: "روغن",
      value: 107.703,
    },
    {
      source: "روغن",
      target: "مایع",
      value: 611.99,
    },
    {
      source: "زباله های دیگر",
      target: "جامد",
      value: 56.587,
    },
    {
      source: "زباله های دیگر",
      target: "تبدیل زیستی",
      value: 77.81,
    },
    {
      source: "گرمای پمپ شده",
      target: "گرمایش و سرمایش - منازل",
      value: 193.026,
    },
    {
      source: "گرمای پمپ شده",
      target: "گرمایش و سرمایش - تجاری",
      value: 70.672,
    },
    {
      source: "خورشیدی PV",
      target: "شبکه برق",
      value: 59.901,
    },
    {
      source: "خورشیدی حرارتی",
      target: "گرمایش و سرمایش - منازل",
      value: 19.263,
    },
    {
      source: "خورشیدی",
      target: "خورشیدی حرارتی",
      value: 19.263,
    },
    {
      source: "خورشیدی",
      target: "خورشیدی PV",
      value: 59.901,
    },
    {
      source: "جامد",
      target: "کشاورزی",
      value: 0.882,
    },
    {
      source: "جامد",
      target: "تولید حرارتی",
      value: 400.12,
    },
    {
      source: "جامد",
      target: "صنعت",
      value: 46.477,
    },
    {
      source: "تولید حرارتی",
      target: "شبکه برق",
      value: 525.531,
    },
    {
      source: "تولید حرارتی",
      target: "تلفات",
      value: 787.129,
    },
    {
      source: "تولید حرارتی",
      target: "گرمایش منطقه ای",
      value: 79.329,
    },
    {
      source: "جزر و مدی",
      target: "شبکه برق",
      value: 9.452,
    },
    {
      source: "انرژی زیستی مستقر در انگلستان",
      target: "تبدیل زیستی",
      value: 182.01,
    },
    {
      source: "موج",
      target: "شبکه برق",
      value: 19.013,
    },
    {
      source: "باد",
      target: "شبکه برق",
      value: 289.366,
    },
  ],
};

export const sankeyChartOptions = {
  textStyle: {
    fontFamily: "IRANSansFaNum",
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
      right: "15%",
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
