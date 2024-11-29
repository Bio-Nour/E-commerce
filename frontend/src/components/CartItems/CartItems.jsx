import { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";

const CartItems = () => {
  const { cartItems, all_product, getTotalCartAmount, removeFromCart } =
    useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id] >0){
          return (
            <div key={e.id} className=" cartitems-format  cartitems-format-main">
              <img src={e.image} alt="" className="carticon-product-icon" />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className="cartitems-quantity">{cartItems[e.id]}</button>
              <p>${e.new_price * cartItems[e.id]}</p>
              <img onClick={() => { removeFromCart(e.id); }} src={remove_icon} alt="" />
            </div>
          );

        }
      })}

      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals:</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button className="cartitems-checkout-btn">
            Proceed to Checkout
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>if you have a promo, code enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Enter your promo code" />
            <button className="cartitems-promocode-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;


