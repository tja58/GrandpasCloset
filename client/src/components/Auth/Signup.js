// Library Imports
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
// Component Imports
import { renderRegInputs, validateRegister } from "../../utils/Auth";

function Signup(props) {
  const { register } = props;

  async function handleSubmit(e) {
    // Prevent refresh
    e.preventDefault();

    // Assign values
    const target = e.target;
    const data = {
      fname: target.fname.value,
      lname: target.lName.value,
      email: target.email.value,
      pnum: target.pNum.value,
      password: target.password.value,
      confirmPass: target.confirmPassword.value,
    };

    // Validate values
    const res = validateRegister(data);

    // Push errors
    if (!res[0] === true) {
      res[1].forEach(([type, msg]) => {
        document.getElementById(type).innerHTML = msg;
        document.getElementById(`input-${type}`).classList.add("invalid-input");
      });
    } else {
      // No errors
      await register(data);
    }
  }

  return (
    <div className="page auth">
      <div className="auth-ctnr register-ctnr">
        <div className="auth-title">Register</div>
        <form className="auth-form register-form" onSubmit={handleSubmit}>
          {renderRegInputs()}
          <div className="auth-btn-ctnr">
            <button className="auth-submit-btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(Signup);
