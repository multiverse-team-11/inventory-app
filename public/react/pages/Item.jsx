import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'


import apiURL from '../api'

export const Item = ({ fetchItems }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { item } = location.state

  async function deleteItem (itemId) {
    try {
      const res = await fetch(`${apiURL}/items/${itemId}`, {
        method: 'DELETE'
      })
      await res.json()
      fetchItems()
      navigate('/')

    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  function confirmDelete(id) {
		// Returns true if the user presses OK, otherwise false
		const confirmed = window.confirm("Are you sure you want to delete this item?");

		if (confirmed) {
			deleteItem(id);
		}
	}

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
            {/*
            <div className='item-button-del-edt'>
              <button
                className='item-button item-button-delete'
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
              <button
                className='item-button item-button-edit'
              >
                Edit
              </button>
            </div>
            */}
            <div className='item-buy'>
              <h4 className='item-price'>£{item.price.toFixed(2)}</h4>
              <button 
                className='item-button item-button-addtocart' 
                onClick={() => confirmDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}