import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">Grandpa's Closet</div>
      <div className="header-links-ctnr">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/products">Products</Link>
        </div>
      </div>
      <div className="header-auth-links-ctnr">
        {!props.auth ? (
          <>
            {" "}
            <div>
              <Link to="/login" className="link-auth">
                Login
              </Link>
            </div>
            <div>
              <Link to="/register" className="link-auth">
                Register
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="/account" className="link-auth">
                Account
              </Link>
            </div>
            <div>
              <Link to="/cart" className="link-auth">
                Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Header);
