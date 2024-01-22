// Modules Imports
import React from "react";
import { connect } from "react-redux";

// Component Imports
import * as actions from "../../store/actions";

function Security(props) {
  console.log(props);
  return <div className="Security"></div>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(Security);
