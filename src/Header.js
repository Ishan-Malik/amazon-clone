import React from 'react'
import './header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from 'react-router-dom';
import {useStateValue} from './StateProvider';
import { auth } from './firebase';
function Header() {
  const[{basket,user},dispatch]=useStateValue();
  const handleit=()=>{
    if(user)
    {
      auth.signOut();
    }
  }
    return (
        <div className="header">
          <Link to="/">
          <img className="logo_header" alt="" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
          </Link>
         <div className="header_search">
         <input className="header_input" type="text"></input>
         <SearchIcon className="header_searchIcon"/>
         </div>
         <div className="header_info">
           <Link to={!user && '/login'}>
          <div onClick={handleit} className="header_info_al">
            <span className="header_info_span1">
             {user?user.email:'Hello guest'} 
            </span>
            <span className="header_info_span2">
              {user?'Signout':'Signin'}
            </span>
          </div>
          </Link>
          <Link to='/orders'>
          <div className="header_info_al">
            <span className="header_info_span1">
              returns
            </span>
            <span className="header_info_span2">
              &orders
            </span>
          </div>
          </Link>
          <div className="header_info_al">
            <span className="header_info_span1">
             your
            </span>
            <span className="header_info_span2">
             prime
            </span>
          </div>
          <Link to="/checkout">
          <div className="shoping_basket">
          <ShoppingBasketIcon />
          <span className="header_info_span2 header_basketcount">{basket?.length}</span>
          </div>
          </Link>
         </div>
        </div>
    )
}

export default Header
