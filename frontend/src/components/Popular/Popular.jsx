import "./Popular.css";
// import data_product from "../../assets/data";    ///commmented after endpoint  finished
import Item from "../Item/Item"
import { useEffect, useState } from "react";

const Popular = () => {
  // Fetch data from the provided JSON file
  const [data_product , setData_product] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/popularinwomen')
     .then(response => response.json())
     .then(data => setData_product(data))
  }, [])
  return (
    <div className="popular">
      <h1>Popular in women</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
