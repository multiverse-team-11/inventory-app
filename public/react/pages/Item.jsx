import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'

import apiURL from '../api'

export const Item = () => {
  const location = useLocation()
  const { item } = location.state
  // const history = useHistory()

  /*
  async function deleteItem (itemId) {
    try {
      const res = await fetch(`${apiURL}/items/${itemId}`, {
        method: 'DELETE'
      })
      await res.json()
      fetchItems()
      // history.push('/')
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }
  */

  return (
    <>
      <Link className='item-go-back' to='/'>
        Go Back
      </Link>
      <main className='content'>
        <div className="item">
          <img className="item-img" src={item.image} alt={item.name} />
          <div className="item-details">
            <h1 className="item-text item-name">{item.name}</h1>
            <h3 className="item-text item-name">{item.category}</h3>
            <p className='item-text item-description'>{item.description}</p>
            <div className='item-button-del-edt'>
              <button
                className='item-button item-button-delete'
              >
                Delete
              </button>
              <button
                className='item-button item-button-edit'
              >
                Edit
              </button>
            </div>

            <div className='item-buy'>
              <h4 className='item-price'>{item.price}$</h4>
              <button className='item-button item-button-addtocart'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}