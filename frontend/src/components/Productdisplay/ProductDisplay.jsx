/* eslint-disable react/prop-types */
import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-lift">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-img">
        <img className="productdisplay-main-img" src={product.image} alt="" />
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(125)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            <p>${product.old_price}</p>
          </div>
          <div className="productdisplay-right-price-new">
            <p>${product.new_price}</p>
          </div>
        </div>
        <div className="productdisplay-right-descreption">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          laboriosam odio distinctio, expedita doloremque ad. 
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>
        <div></div>
        <p className="productdisplay-right-category">
          <span>Category:</span>Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
