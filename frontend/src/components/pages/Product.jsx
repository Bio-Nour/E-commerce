import { useContext } from "react";
import "./CSS/Product.css"
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Breadcrums/Breadcrum";
import ProductDisplay from "../Productdisplay/ProductDisplay";
import DescreptionBox from "../DescreptionBox/DescreptionBox";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

const Product = () => {
    const {all_product} = useContext(ShopContext)
    const {productId} = useParams()
    const product = all_product.find((p) => p.id === Number(productId))
    return (
        <div className="product">
            <Breadcrum product={product}/>
            <ProductDisplay  product={product} />
            <DescreptionBox/>
            <RelatedProducts/>
        </div>
    );
}

export default Product;
