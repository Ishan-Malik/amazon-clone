import React from 'react'
import './product.css';
import {useStateValue} from './StateProvider';
function Product({id,title,price,rating,image}) {
    const[{basket},dispatch]=useStateValue();
    console.log(basket);
    const additem=()=>{
    dispatch({
        type:'ADD_TO_BASKET',
        item:{
            id:id,
            title:title,
            price:price,
            rating:rating,
            image:image
        }
    })
   }
    return (
        <div className="product">
         <div className="product_info">
          <p>{title}</p>
           <p className="price">
            <small>Rs.</small>
            <strong>{price}</strong>
           </p>
           <div className="rating">
            {
                Array(rating).fill().map((_,i)=>(
                 <p>⭐</p>
                ))
            }
           </div>
         </div>
         <img alt="" src={image}></img>
        <button onClick={additem}>Add to basket</button>
        </div>
    )
}

export default Product
