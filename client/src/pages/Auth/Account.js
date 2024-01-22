// Modules Imports
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Component Imports
import * as actions from "../../store/actions";

const cards = [
  {
    img: "fa-brands fa-opencart",
    title: "Your Orders",
    desc: "Track, cancel an order or download invoice",
    link: "/orders",
  },
  {
    img: "fa-solid fa-shield",
    title: "Login & Security",
    desc: "Edit login, name, and mobile number",
    link: "/security",
  },
  {
    img: "fa-regular fa-address-book",
    title: "Your Address",
    desc: "Edit, remove, or set default address",
    link: "/address",
  },
  {
    img: "fa-solid fa-headset",
    title: "Contact Us",
    desc: "Desc",
    link: "/contact-us",
  },
];

function Account(props) {
  console.log(props);
  return (
    <div className="account">
      <div className="account-title">Your Account</div>
      <div className="account-cards">
        {cards.map(({ img, title, desc, link }) => {
          return (
            <Link className="account-card-link" to={link} key={title}>
              <div className="account-card">
                <div className="account-card-img">
                  <i className={img}></i>
                </div>
                <div className="account-card-info">
                  <div className="account-card-title">{title}</div>
                  <div className="account-card-desc">{desc}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(Account);
