

import Hero from '../Hero/Hero';
import NewCollections from '../NewCollections/NewCollections';
import NewsLetter from '../NewsLetter/NewsLetter';
import Offers from '../Offers/Offers';
import Popular from '../Popular/Popular';

const Shop = () => {
    return (
        <div>
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollections/>
            <NewsLetter/>
            
        </div>
    );
}

export default Shop;
