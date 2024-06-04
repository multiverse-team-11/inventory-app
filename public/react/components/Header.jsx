import classNames from 'classnames';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'

export const Header = () => {
  const getLinkClass = ({ isActive }) => classNames('nav-link', {
    'nav-link-active': isActive
  })

  return <>
    <div class="header">
      <a>Inventory app</a>
      <div class="header-nav-cart">      
        <NavLink to='/' className={getLinkClass}>
            Pages
        </NavLink>
        
          <NavLink to='/form' className={getLinkClass}>
            Form
          </NavLink>
          <NavLink to='/item' className={getLinkClass}>
            Item
          </NavLink>
        
        <button className='header-button button-add-item'>Add Item</button>
      </div>
    </div>
    <div>
      <Outlet />
    </div>
  </>
} 
