// Non Auth pages
import Landing from "./Landing";
import Products from "./Products";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";

// Auth pages
import Cart from "./Auth/Cart";
import Account from "./Auth/Account";
import Address from "./Auth/Address";
import CustomerService from "./Auth/CustomerService";
import Orders from "./Auth/Orders";
import Security from "./Auth/Security";

export const pages = [
  { component: Landing, path: "/" },
  { component: Products, path: "/products" },
  { component: Signup, path: "/register" },
  { component: Login, path: "/login" },
];

export const authPages = [
  { component: Cart, path: "/cart" },
  { component: Account, path: "/account" },
  { component: Address, path: "/address" },
  { component: CustomerService, path: "/contact-us" },
  { component: Orders, path: "/orders" },
  { component: Security, path: "/security" },
];
