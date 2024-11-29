/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
// import all_product from "../../assets/all_product";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
// Display or fecth all products by api 
   const [ all_product, setAllProduct] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3000/allproducts")
    .then((response)=>response.json())
    .then((data)=>setAllProduct(data));

    // 
    if(localStorage.getItem("auth-token")){
      fetch("http://localhost:3000/getcart", {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body:"",
      })
     .then((response)=>response.json())
     .then((data)=>setCartItems(data))
    }

  },[])
   
      


  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    // console.log(cartItems);
    if(localStorage.getItem('auth-token')){
      fetch("http://localhost:3000/addtocart", {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify ({'itemId': itemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data))
      
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token')){
      fetch("http://localhost:3000/removefromcart", {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify ({'itemId': itemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if(cartItems[item] > 0){
        let itemInfo = all_product.find((product)=>product.id===Number(item))
        totalAmount +=     cartItems[item] * itemInfo.new_price ;
      }
      

    }
    return totalAmount;
  };
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
      
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };
  const ContextValue = {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems ,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
