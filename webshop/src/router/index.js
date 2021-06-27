import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/login/Login.vue";
import User from "@/components/user/User.vue";
import Overview from "@/components/overview/Overview.vue";
import SignUp from "@/components/signUp/SignUp.vue";
import ShoppingCart from "../components/shoppingCart/ShoppingCart";
import Admin from "@/components/admin/Admin.vue";
import AddProduct from "@/components/addProduct/AddProduct.vue";
import EditProduct from "@/components/editProduct/EditProduct.vue";
import ShowAllProducts from "@/components/showAllProducts/ShowAllProducts.vue";
import ShowAllUsers from "@/components/showAllUsers/ShowAllUsers.vue";
import Orders from "@/components/orders/Orders.vue";
import AddOrder from "@/components/addOrder/AddOrder.vue";
import { Path } from "../constants/Path";
import GoogleMap from "../components/googleMap/GoogleMap";
import MakeAdmin from "@/components/makeAdmin/MakeAdmin.vue";

// import { useRouter, useRoute } from "vue-router";
import firebase from "firebase";

const routes = [
  {
    path: Path.HOME,
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: Path.LOGIN,
    name: "Login",
    component: Login,
    meta: { loggedIn: true },
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
    meta: { requiresAuth: true },
  },
  {
    path: Path.SIGNUP,
    name: "SignUp",
    component: SignUp,
    meta: { loggedIn: true },
  },
  {
    path: Path.SHOPPINGCART,
    name: "ShoppingCart",
    component: ShoppingCart,
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
  {
    path: Path.GOOGLEMAP,
    name: "GoogleMap",
    component: GoogleMap,
  },
  {
    path: Path.MAKEADMIN,
    name: "MakeAdmin",
    component: MakeAdmin,
  },
  {
    path: Path.ADDORDER,
    name: "AddOrder",
    component: AddOrder,
  },
  {
    path: Path.ORDERS,
    name: "Orders",
    component: Orders,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  const loggedIn = to.matched.some((record) => record.meta.loggedIn);

  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
    /* if the User already Loggedin */
  } else if (loggedIn && isAuthenticated) {
    next("/overview");
    // TODO => isAuthenticated bzw. firebase.auth().currentUser; sollte im lokal storage gespeichert werden, denn wenn man
    // in der URL z.B. /login eingibt, dann wird man im login seite landen obwohl man schon eingeloggt ist,
    // weil firebase.auth().currentUser; dauert lange bis sie eine antwort bekommt
  } else {
    next();
  }
});

export default router;
