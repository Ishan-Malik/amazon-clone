import React,{useState,useEffect} from 'react'
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {Link,useHistory} from 'react-router-dom';
import './Payment.css';
import CurrencyFormat from 'react-currency-format'
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import {db} from './firebase';
function Payment() {
    const[{basket,user},dispatch]=useStateValue();
    const stripe=useStripe();
    const element=useElements();
    const [disabled,setdisabled]=useState(true);
    const [processing,setprocessing]=useState("");
    const [succeded,setsucceded]=useState(false);
    const [error,seterror]=useState('');
    const [clientSecret,setclientSecret]=useState(true);
    const history=useHistory();
    useEffect(() => {
       const getclientSecret=async()=>{
        var config = {
            method: 'POST',
            //url: required to post request to display,
            data:{
                total:basket.reduce((total, item)=>total = total + item.price,0)*100,
            }
          };
          axios(config)
         .then(result=>{
             console.log(result)
             setclientSecret(result.data.clientSecret)
         })
         .catch(err=>{
             console.log(err)
         }) 
        }
       getclientSecret();
    }, [basket])
    console.log("jaat",clientSecret);
    console.log(user);
    const handleSubmit=async(event)=>{
    event.preventDefault();
    console.log("here is ",clientSecret);
    const payload=await stripe.confirmCardPayment(clientSecret,
        {
         payment_method:{
             card:element.getElement(CardElement)
         }   
        }).then(({paymentIntent})=>{
            db.collection('users').doc(user.uid).collection('orders').doc(paymentIntent.id).set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
            setsucceded(true)
            seterror(null)
            setprocessing(false)
            dispatch({
                type:'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
    }
    const handleChange=e=>{
     setdisabled(e.empty);
     seterror(e.error?e.error.message:"");
    }
    return (
        <div className="payment">
         <div className="payment_cont">
            <h1>
             Checkout(<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>
          <div className="payment_section">
          <div className="payment_title">
          <h3>Delivery Address</h3>
          </div>
           <div className="payment_add">
            <p>{user?.email}</p>
            <p>23 ReactLane</p>
            <p>Los angeles</p>
           </div>
          </div>
          <div className="payment_section">
          <div className="payment_title">
          <h3>Reveiw items and Delivery</h3>
          </div>
          <div className="payment_items">
           {basket.map(item=>(
                <CheckoutProduct 
                id={item.id}
                price={item.price}
                rating={item.rating}
                title={item.title}
                image={item.image}
                />
            ))}
          </div>
          </div>
          <div className="payment_section">
          <div className="payment_title">
          <h3>Payment Details</h3>
          </div>
          <div className="payment_meth">
          <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              <div className="payment_pricet">
              <CurrencyFormat
          renderText={(value) => (
            <>
           <h3>Order Total:{value}</h3>
            </>
          )}
          decimalScale={2}
          value = {basket.reduce((total, item)=>total = total + item.price,0)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rs."}
        />
              </div>
              <button disabled={processing||disabled||succeded}>
                <span>{processing?"processing":"Buy Now"}</span>
              </button>
          </form>
          </div>
          {error&&<div>{error}</div>}
          </div>
         </div>
        </div>
    )
}

export default Payment
