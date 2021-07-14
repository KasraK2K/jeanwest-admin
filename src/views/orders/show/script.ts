import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ name: "ShowOrder" })
class ShowOrder extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;

  private title = "نمایش سفارش";
  private breadcrumbs = [
    {
      text: "صفحه اصلی",
      to: "/",
    },
    {
      text: "لیست سفارشات",
      to: { name: "AllOrders" },
    },
    {
      text: this.title,
      to: document.location.pathname,
    },
  ];
}

export default ShowOrder;
