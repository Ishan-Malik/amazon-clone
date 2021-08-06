import './App.css';
import Header from './Header';
import Home from './Home';
import {useEffect} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Checkout from './Checkout.js';
import Login from './Login';
import {auth} from './firebase';
import { useStateValue } from './StateProvider';
import Orders from './Orders';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
//const promise =loadStripe(your stripe id);

function App() {
  const [{},dispatch]=useStateValue();
useEffect(() => {
  auth.onAuthStateChanged(authuser=>{
    console.log("user is",authuser);
    if(authuser)
    {
   dispatch({
     type:'SET_USER',
     user:authuser
   })
    }
    else
    {
      dispatch({ 
      type:'SET_USER',
      user:null
    })
    }
  })
}, [])
  return (
    <Router>
    <div className="app">
      <Switch>
        <Route exact path="/">
        <Header />
        <Home />
        </Route>
        <Route path="/checkout">
        <Header />
        <Checkout />
        </Route>
        <Route path="/login">
        <Login />
        </Route>
        <Route path='/orders'>
          <Header />
          <Orders />
        </Route>
        <Route path="/payment">
        <Header />
        <Elements stripe={promise}>
        <Payment />
        </Elements>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
