import { useEffect, useState } from "react";
import "./Listproduct.css";
import cross_icon from "../../assets/cross_icon.png";
const Listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  // Fetching data from API
  const fetchData = async () => {
    await fetch("http://localhost:3000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });

    //This another method for then
    // const data = await response.json()
    // setAllProducts(data)
  };
  useEffect(() => {
    fetchData();
    // Cleanup function
    return () => {
      // Close any open connections or timeouts
    };
  }, []);
  // Delete product from API
  const remove_product = async (id) => {
    await fetch("http://localhost:3000/removeproduct" , {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchData()
     
  };

  return (
    <div className="list-product">
      <h1>All Proucts list</h1>
      <div className="listproduct-format-main">
        <p>Prosucts</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        {/* Add product data here */}
        <hr />
        {allproducts.map((product, index) => {
          return (
            <div
              key={index}
              className="listproduct-format-main listproduct-format"
            >
              <img
                src={product.image}
                alt=""
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  remove_product(product.id);
                }}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listproduct;
