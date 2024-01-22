import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import black from "../imgs/black.jpg";

function productCard(product) {
  return (
    <div className="product-card">
      <Link>
        <img src={black} alt="temp" />
        <span>Product</span>
      </Link>
      <div className="product-desc">
        <span>Description of product</span>
        <span>$10</span>
      </div>
    </div>
  );
}

function Products(props) {
  console.log(props);
  return (
    <div className="products">
      <div className="products-title">Grandpa's Clothes</div>
      <div className="products-category">
        <span>
          <Link>Shirts</Link>
        </span>
        <span>
          <Link>Dresses</Link>
        </span>
        <span>
          <Link>Pants</Link>
        </span>
        <span>
          <Link>Jackets</Link>
        </span>
      </div>
      <div className="products-all">
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
        {productCard()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Products);
