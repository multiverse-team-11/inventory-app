import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'

export const Header = () => {

  return <>
    <div class="header">
      <a>Inventory app</a>
      <div class="header-nav-cart">      
        <NavLink to='/'>
            Pages
        </NavLink>
        
          <NavLink to='/form'>
            Form
          </NavLink>
          <NavLink to='/item'>
            Item
          </NavLink>
        

        <img className='header-cart' src='shopping-cart.png'></img>
        <button>Add Item</button>
      </div>
    </div>
    <div>
      <Outlet />
    </div>
  </>
} 
