import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import auth from "./Auth";
import prod from "./Product";
import admin from "./Admin";

export default combineReducers({
  // auth
  auth,
  // customer
  prod,
  // product
  admin,
  reduxForm,
});
