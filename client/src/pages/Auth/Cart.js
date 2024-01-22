// Modules Imports
import React from "react";
import { connect } from "react-redux";

// Component Imports
import * as actions from "../../store/actions";

function Cart() {
  return <div>Cart</div>;
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(Cart);
