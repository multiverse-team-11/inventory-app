import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import apiURL from '../api'

export const Item = () => {
  const location = useLocation()
  const { item } = location.state

  return (
    <main className='content'>
      <div className="item">
        <img className="item-img" src={item.image} alt={item.name} />
        <div className="item-details">
          <h1 className="item-text item-name">{item.name}</h1>
          <h3 className="item-text item-name">{item.category}</h3>
          <p className='item-text item-description'>{item.description}</p>
          <h2 className='item-text item-price'>{item.price}$</h2>
        </div>
      </div>
    </main>
  )
}