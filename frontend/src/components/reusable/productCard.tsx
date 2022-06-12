import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/productCard.css";

interface ProductCardProps {
  productId: number;
}

interface ProductCardState {}

class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  render(): React.ReactNode {
    const { productId } = this.props;
    return (
      <div className="card">
        <div className="imgBx">
          <img
            src={require(`../../services/img/watch${productId}.png`)}
            alt="Product 1"
          />
          <h2>{`Product ${productId}`}</h2>
          <div className="content">
            <div className="size">
              <h3>Sizes :</h3>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
            <div className="color">
              <h3>colors :</h3>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Link to="product1" className="link">
              More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
