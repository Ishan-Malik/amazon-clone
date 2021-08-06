import React,{useState,useEffect} from 'react'
import {db} from './firebase';
import './Orders.css';
import {useStateValue} from './StateProvider';
import Order from './Order';
function Orders() {
    const[orders,Setorders]=useState([]);
    const[{basket,user},dispatch]=useStateValue();
    useEffect(() => {
        if(user)
        {
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .orderBy('created','desc')
              .onSnapshot(snapshot=>{
                  Setorders(snapshot.docs.map(doc=>({
                      id:doc.id,
                      data:doc.data()
                  })))
              })
        }
        else
        {
            Setorders([])
        }
    }, [user])
    return (
        <div className="orders">
           <h1>Your Orders</h1>
           <div className="orders_order">
               {orders?.map(order =>(
                   <Order order={order} />
               ))}
            </div> 
        </div>
    )
}

export default Orders
