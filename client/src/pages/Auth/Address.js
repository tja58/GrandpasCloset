// Modules Imports
import React from "react";
import { connect } from "react-redux";

// Component Imports
import * as actions from "../../store/actions";

function Address(props) {
  console.log(props);
  return <div className="Address"></div>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(Address);
