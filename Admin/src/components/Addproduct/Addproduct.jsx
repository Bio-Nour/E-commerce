import "./Addproduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";

const Addproduct = () => {
const [image, setImage] =useState(false)
const [productDetails, setProductDetails] = useState({
  name: '',
  image:'',
  old_price: '',
  new_price: '',
  category: 'women'
})

const imagehandler =(e)=>{
  setImage(e.target.files[0])
}
const changehandler =(e)=>{
  setProductDetails({...productDetails, [e.target.name]: e.target.value })
}
const Add_Product = async ()=>{
  console.log(productDetails);
  let responseData;
  let product = productDetails;
  let formData = new FormData();
  formData.append('product',image);
  // send form data to server
  await fetch('http://localhost:3000/upload',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
    } ,
    body:formData,
  }).then((res)=>res.json()).then((data)=>{responseData = data})
  if(responseData.success){
    product.image = responseData.image_url
    console.log(product);
    await fetch("http://localhost:3000/addproduct",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(product),
    }).then((res)=>res.json()).then((data)=>{
      data.success ? alert("Product successfully Added!") : alert("Product Failed")
    })
  }
  
}

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changehandler} type="text" name="name" placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changehandler} type="number" name="old_price" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changehandler} type="number" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changehandler} name="category" className="add_product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          {/* condition to upload image */}
          <img src={image ? URL.createObjectURL(image):upload_area} alt="" className="addproduct-thumnail-img" />
        </label>
        <input onChange={imagehandler} type="file" id="file-input" name="image" hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className="addproduct-btn">Add</button>
    </div>
  );
};

export default Addproduct;
