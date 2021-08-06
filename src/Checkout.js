import React from 'react'
import './Checkout.css';
import Subtotal from './Subtotal';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import FlipMove from 'react-flip-move';
function Checkout() {
    const [{basket,user},dispatch]=useStateValue();
    return (
        <div className="checkout">
        <div className="left_hand">
        <img alt="" className="left_upimg" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"></img>
        <div>
         <h3>Hello {user?.email}</h3>
        <h2 className="lst">Your Shopping List</h2>
        {
            <FlipMove>
              {basket.map(item=>(
                <CheckoutProduct 
                id={item.id}
                price={item.price}
                rating={item.rating}
                title={item.title}
                image={item.image}
                />
            ))}
            </FlipMove>
        }
        </div>
        </div>
        <div className="right_hand">
         <Subtotal />
        </div>
        </div>
    )
}

export default Checkout
