// Modules Imports
import React from "react";
import { connect } from "react-redux";

// Component Imports
import * as actions from "../../store/actions";

function CustomerService(props) {
  console.log(props);
  return <div className="CustomerService"></div>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(CustomerService);
