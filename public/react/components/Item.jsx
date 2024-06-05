import React, {useEffect} from 'react';
import apiURL from '../api';

export const Item = ({ item, fetchItem, fetchItems, setFormIsActive, setSelectedPage }) => {
  //DELETE Item
  async function deleteItem (itemId) {
    try {
      const res = await fetch(`${apiURL}/items/${itemId}`, {
        method: 'DELETE'
      })
      await res.json()
      fetchItems()
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  return <>
    <div className="card">
      <div className="card-img-container" onClick={() => fetchItem(item.id)}>
        <img className='card-img' src={item.image} alt={item.name} />
      </div>
        <h4 className="card-text">{item.name}</h4>
      <div>
        <button 
          className='card-button card-button-delete'
          onClick={() => deleteItem(item.id)}
        >
          Delete
        </button>
        <button 
          className='card-button card-button-edit'
          onClick={() => {
            setSelectedPage(item)
            setFormIsActive(true)
          }}
        >
          Edit
        </button>
      </div>
      <div className='card-buy'>
        <h4 className='card-price'>{item.price}$</h4>
        <button className='card-button card-button-addtocart'>
          Add to Cart
        </button>
      </div>
    </div>
  </>
} 
	