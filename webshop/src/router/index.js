import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/login/Login.vue";
import User from "@/components/user/User.vue";
import Overview from "@/components/overview/Overview.vue";
import SignUp from "@/components/signUp/SignUp.vue";
import Admin from "@/components/admin/Admin.vue";
import AddProduct from "@/components/addProduct/AddProduct.vue";
import EditProduct from "@/components/editProduct/EditProduct.vue";
import ShowAllProducts from "@/components/showAllProducts/ShowAllProducts.vue";
import ShowAllUsers from "@/components/showAllUsers/ShowAllUsers.vue";
import { Path } from "../constants/Path";

const routes = [
  {
    path: Path.HOME,
    name: "Home",
    component: Home,
  },
  {
    path: Path.LOGIN,
    name: "Login",
    component: Login,
  },
  {
    path: Path.OVERVIEW,
    name: "Overview",
    component: Overview,
  },
  {
    path: Path.USER,
    name: "User",
    component: User,
  },
  {
    path: Path.SIGNUP,
    name: "SignUp",
    component: SignUp,
  },
  {
    path: Path.ADMIN,
    name: "Admin",
    component: Admin,
  },
  {
    path: Path.ADDPRODUCT,
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: Path.EDITPRODUCT,
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: Path.SHOWALLPRODUCTS,
    name: "ShowAllProducts",
    component: ShowAllProducts,
  },
  {
    path: Path.SHOWALLUSERS,
    name: "ShowAllUsers",
    component: ShowAllUsers,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
