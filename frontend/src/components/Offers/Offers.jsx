import './Offers.css';
import exclusive_mage from '../../assets/exclusive_image.png'

const Offers = () => {
    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLE ON BEST SELLER PRODUCTS</p>
                <button>check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_mage} alt="" />

            </div>
            
        </div>
    );
}

export default Offers;
