import classNames from 'classnames';
import React, { useState } from 'react';
import { Form } from './Form'
import { NavLink, Outlet } from 'react-router-dom'

export const Header = ({ setFormIsActive }) => {

  const getLinkClass = ({ isActive }) => classNames('nav-link', {
    'nav-link-active': isActive
  })

  return <>
    <div className="header">
      <a>Inventory app</a>
      <div className="header-nav-cart">      
        <NavLink to='/' className={getLinkClass}>
            Pages
        </NavLink>
        
          {/*
          <NavLink to='/form' className={getLinkClass}>
            Form
          </NavLink>
          <NavLink to='/item' className={getLinkClass}>
            Item
          </NavLink>
          */}
        
        <button className='header-button button-add-item' onClick={() => setFormIsActive(true)}>Add Item</button>
      </div>
    </div>
    <div>
      <Outlet />
    </div>
  </>
} 
