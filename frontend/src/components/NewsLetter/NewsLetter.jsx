import './NewsLetter.css'

const NewsLetter = () => {
    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers on your Email</h1>
            <p>Subscribe to our newletter and stay Update</p>
            <div>
                <input type="email" placeholder='Your emeil id'/>
                <button>Subscribe</button>
            </div>
            
        </div>
    );
}

export default NewsLetter;
