import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import {useStateValue} from './StateProvider';
import {useHistory} from 'react-router-dom';
function Subtotal() {
  const history=useHistory();
  const [{basket},dispatch]=useStateValue();
    return (
        <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                {/* Part of the homework */}
                Subtotal ({basket?.length} items): <strong>{value}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
              </small>
            </>
          )}
          decimalScale={2}
          value = {basket.reduce((total, item)=>total = total + item.price,0)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rs."}
        />
  
        <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
      </div>
    )
}

export default Subtotal
