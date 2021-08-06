import React,{forwardRef} from 'react'
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
const CheckoutProduct=forwardRef(({id,price,rating,title,image,hidebutton},ref)=>{
    const [{basket},dispatch]=useStateValue();
    const removePro=()=>{
        dispatch({
            type:'REMOVE_PRODUCT',
            id:id
        })
    }
    return (
        <div className="checkproduct" ref={ref}>
         <img alt="" src={image} className="prod_img"></img>
         <div className="prod_info">
           <p className="prod_title">{title}</p>
           <p className="price_info">
            <small>Rs.</small>
            <strong>{price}</strong>
           </p>
           <div className="rating_info">
            {
                Array(rating).fill().map((_,i)=>(
                 <p>⭐</p>
                ))
            }
           </div>
           {!hidebutton &&(
            <button onClick={removePro}>Remove item</button>
           )}
         </div>   
        </div>
    )
})
export default CheckoutProduct
