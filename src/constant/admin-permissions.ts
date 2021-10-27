export const AdminCrudPermissions: { value: number; text: string }[] = [
  { text: "مشاهده", value: 1 },
  { text: "ایجاد", value: 2 },
  { text: "ویرایش", value: 3 },
  { text: "حذف", value: 4 },
  { text: "بازگردانی", value: 5 },
];

export const AdminModulePermissions: {
  value: number;
  text: string;
  module: string;
}[] = [
  { value: 101, text: "auth/admin", module: "auth/admin" },
  { value: 102, text: "auth/customer", module: "auth/customer" },
  { value: 103, text: "branches", module: "branches" },
  { value: 104, text: "club/deployment", module: "club/deployment" },
  { value: 105, text: "club/filter", module: "club/filter" },
  { value: 106, text: "club/home", module: "club/home" },
  { value: 107, text: "aboutUs", module: "aboutUs" },
  { value: 108, text: "returnPolicy", module: "returnPolicy" },
  { value: 109, text: "erp/branch", module: "erp/branch" },
  { value: 110, text: "erp/product", module: "erp/product" },
  { value: 111, text: "erp/promotion", module: "erp/promotion" },
  { value: 112, text: "erp/user", module: "erp/user" },
  { value: 113, text: "category", module: "category" },
  { value: 114, text: "product", module: "product" },
  { value: 115, text: "logistic", module: "logistic" },
  { value: 116, text: "notification", module: "notification" },
  { value: 117, text: "order", module: "order" },
  { value: 118, text: "otp", module: "otp" },
  { value: 119, text: "payment", module: "payment" },
  { value: 120, text: "promotion/discount", module: "promotion/discount" },
  { value: 121, text: "promotion/croup", module: "promotion/croup" },
  { value: 122, text: "promotion/point", module: "promotion/point" },
  { value: 123, text: "promotion", module: "promotion" },
  { value: 124, text: "contactUs", module: "contactUs" },
  { value: 125, text: "faq", module: "faq" },
  { value: 126, text: "ticket", module: "ticket" },
  { value: 127, text: "address", module: "address" },
  { value: 128, text: "admin", module: "admin" },
  { value: 129, text: "customer", module: "customer" },
  { value: 130, text: "favorite", module: "favorite" },
  { value: 131, text: "inviteFriendsFAQ", module: "inviteFriendsFAQ" },
  { value: 132, text: "membershipLevelCards", module: "membershipLevelCards" },
  { value: 133, text: "map", module: "map" },
  { value: 134, text: "promotion/offer", module: "promotion/offer" },
];

export const AllCrudAccess = [1, 2, 3, 4, 5];

export const AllModuleAccess = [
  101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,
  116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
  131, 132, 133, 134,
];

export const ViewerAccess = [1, ...AllModuleAccess];

export const EditorAccess = [1, 2, 3, ...AllModuleAccess];

export const OwnerAccess = [...AllCrudAccess, ...AllModuleAccess];
