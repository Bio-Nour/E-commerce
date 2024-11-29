

import Addproduct from "../../components/Addproduct/Addproduct"
import Listproduct from "../../components/Listproduct/Listproduct"
import SideBar from "../../components/Sidebar/SideBar"
import "./Admin.css"
import { Routes, Route } from "react-router-dom"
const Admin = () => {
  return (
    <div className="admin">
      <SideBar/>
      <Routes>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path="/listproduct" element={<Listproduct/>}/>
        {/* <Route path="/editproduct/:id" element={<EditProduct/>}/> */}
        {/* <Route path="/" element={<ProductList/>}/> */}
      </Routes>
      
    </div>
  )
}

export default Admin
