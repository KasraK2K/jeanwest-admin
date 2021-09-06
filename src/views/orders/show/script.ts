import { Vue, Component, Prop } from "vue-property-decorator";
import OrderService from "@/services/Order.service";
import { IOrder } from "@/interfaces/entities/order.interface";
import { ITransaction } from "@/interfaces/entities/transaction.interface";

@Component({ name: "ShowOrder" })
class ShowOrder extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;

  // ──────────────────────────────────────────────────────────
  //   :::::: D A T A : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  private title = "نمایش سفارش ";
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
  private ready = false;
  private order!: IOrder;

  // ────────────────────────────────────────────────────────────────────
  //   :::::: L I F E S Y C L E : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  private mounted(): void {
    OrderService.findOne(this.id).then((response) => {
      this.order = response.data.data;
      this.title += this.order.code;
      this.ready = true;
    });
  }

  // ──────────────────────────────────────────────────────────────
  //   :::::: M E T H O D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  private transaction(transaction: ITransaction) {
    return {
      code: transaction && transaction.code ? transaction.code : "ندارد",
      gateClass: this.gateDetailGenerator(transaction).class,
      gateName: this.gateDetailGenerator(transaction).name,
    };
  }

  private gateDetailGenerator(transaction: ITransaction): {
    name: string;
    class: string;
  } {
    if (transaction && transaction.gateId)
      switch (transaction.gateId) {
        case 1:
          return { name: "زرین‌پال", class: "warning--text" };

        case 2:
          return { name: "سامان", class: "primary--text" };
      }
    return { name: "ندارد", class: "error--text" };
  }

  private fullName(address: Record<string, string>) {
    return `${address.firstName} ${address.lastName}`;
  }
}

export default ShowOrder;
