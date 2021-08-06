import React from 'react'
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from './StateProvider';
function Order({order}) {
    const [{basket},dispatch]=useStateValue();
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY,h:mma")}</p>
            <p className="order_title">
               <small>{order.title}</small> 
            </p>
            {
                order.data.basket?.map(item =>(
                <CheckoutProduct 
                 id={item.id}
                 title={item.title}
                 image={item.image}
                 price={item.price}
                 rating={item.rating}
                 hidebutton
                  />
                ))
            }
            <CurrencyFormat
          renderText={(value) => (
            <>
           <h3 className="order_total">Order Total:{value}</h3>
            </>
          )}
          decimalScale={2}
          value = {order.data.amount /100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rs."}
        />
        </div>
    )
}

export default Order
