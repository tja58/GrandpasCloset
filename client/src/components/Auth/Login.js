// Library Imports
import React from "react";
import { connect } from "react-redux";
// Component Imports
import { validateLogin } from "../../utils/Auth";
import * as actions from "../../store/actions";
import { renderLoginInputs } from "../../utils/Auth";

function Login(props) {
  const { login } = props;

  async function handleSubmit(e) {
    // Prevent refresh
    e.preventDefault();

    // Assign values
    const target = e.target;
    const data = {
      email: target.email.value,
      password: target.password.value,
    };

    // Validate email and password
    const res = validateLogin(data);

    // Push errors
    if (!res[0] === true) {
      res[1].forEach(([type, msg]) => {
        document.getElementById(type).innerHTML = msg;
        document.getElementById(`input-${type}`).classList.add("invalid-input");
      });
    } else {
      // Api request to server
      await login(data);
    }
  }

  return (
    <div className="page auth">
      <div className="auth-ctnr login-ctnr">
        <div className="auth-title">Login</div>
        <form className="auth-form login-form" onSubmit={handleSubmit}>
          {renderLoginInputs()}
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

export default connect(mapStateToProps, actions)(Login);
