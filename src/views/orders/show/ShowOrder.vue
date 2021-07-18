<template>
  <v-container fluid v-if="ready">
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <v-card elevation="2" outlined rounded class="mb-3">
      <v-row>
        <v-col cols="12" md="3" class="justify-center">
          <v-card-title class="blue--text">اطلاعات تحویل گیرنده</v-card-title>

          <v-card-text>
            <p>
              <span>تحویل گیرنده:</span>
              <span class="font-weight-bold mr-2">{{
                order.address.receiverFullName
              }}</span>
            </p>
            <p>
              <span>شماره تماس:</span>
              <span class="font-weight-bold mr-2">{{
                toPersianString(`0${order.address.receiverMobile}`)
              }}</span>
            </p>
            <p>
              <span>آدرس:</span>
              <span class="font-weight-bold mr-2">
                {{ order.address.address }}
              </span>
            </p>

            <v-alert color="blue" class="mb-0" text>
              <div class="d-flex justify-space-between">
                <span class="mr-auto ml-5">کد تحویل به مامور ارسال:</span>
                <span class="font-weight-bold ml-auto">{{
                  order.delivery.code ? order.delivery.code : "ندارد"
                }}</span>
              </div>
            </v-alert>
          </v-card-text>
        </v-col>

        <v-col cols="12" md="3">
          <v-card-title class="blue--text">اطلاعات بسته ارسالی</v-card-title>

          <v-card-text>
            <p>
              <span>نوع ارسال:</span>
              <span class="font-weight-bold mr-2">{{
                order.logistic.name
              }}</span>
            </p>
            <p>
              <span>تاریخ ثبت سفارش:</span>
              <span class="font-weight-bold mr-2">{{
                toPersianString(
                  toPersianTime(order.datetime.created_at, "HH:mm | YYYY/MM/DD")
                )
              }}</span>
            </p>
            <p>
              <span>تاریخ تحویل سفارش:</span>
              <span class="font-weight-bold mr-2">
                {{
                  order.delivery.date
                    ? toPersianString(
                        toPersianTime(order.delivery.date, "ddd | YYYY/MM/DD")
                      )
                    : "ندارد"
                }}
              </span>
            </p>
            <p>
              <span>زمان تحویل سفارش:</span>
              <span class="font-weight-bold mr-2">
                {{
                  order.delivery.date
                    ? toPersianString(
                        toPersianTime(order.delivery.date, "HH:mm:ss")
                      )
                    : "ندارد"
                }}
              </span>
            </p>
            <p class="mb-0">
              <span>وضعیت پرداخت:</span>
              <!-- TODO: change true to real condition -->
              <span
                class="font-weight-bold primary--text mr-2"
                :class="true ? 'primary--text' : 'warning--text'"
                >درگاه پرداخت {{ true ? "سامان" : "زرین‌پال" }}</span
              >
            </p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" md="4">
        <v-card elevation="2" outlined rounded class="mb-3">
          <v-list-item>
            <v-img
              class="ml-4"
              max-width="200"
              :src="require('@/assets/images/jeanwest-logo.png')"
            />

            <v-list-item-content>
              <v-card-title class="mb-3">
                <span>جوتی‌جینز</span>
                <v-spacer></v-spacer>
                <v-chip color="red" label outlined class="mr-3"
                  >مرجوع شده</v-chip
                >
              </v-card-title>
              <v-list-item-title class="mb-3">
                پیراهن مردانه آستین کوتاه جوتی‌جینز
              </v-list-item-title>
              <p class="mb-3">
                <span>رنگ:</span>
                <span class="font-weight-bold mr-2">آبی کم‌رنگ (5493)</span>
              </p>
              <p class="mb-3">
                <span>سایز:</span>
                <span class="font-weight-bold mr-2">XXXL</span>
              </p>
              <p class="mb-3">
                <span>کد کالا:</span>
                <span class="font-weight-bold mr-2">۰۲۷۴۲۱۲۲</span>
              </p>
              <p class="mb-3">
                <span>قیمت واحد:</span>
                <span class="font-weight-bold mr-2">۳۴۹,۰۰۰ تومان</span>
              </p>
              <p class="mb-3">
                <span>تعداد:</span>
                <span class="font-weight-bold mr-2">۲</span>
              </p>
              <v-alert outlined text>
                <div class="d-flex">
                  <span>قیمت نهایی:</span>
                  <span class="font-weight-bold mr-auto">۶۹۸,۰۰۰ تومان</span>
                </div>
              </v-alert>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import OrderService from "@/services/Order.service";
import { IOrder } from "@/interfaces/entities/order.interface";

@Component({ name: "ShowOrder" })
class ShowOrder extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;

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

  private mounted() {
    OrderService.findOne(this.id).then((response) => {
      this.order = response.data.data;
      this.title += this.order.code;
      this.ready = true;
    });
  }
}

export default ShowOrder;
</script>

<style lang="sass" scoped>
@import "./style.sass"
</style>
