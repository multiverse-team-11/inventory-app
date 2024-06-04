import React from 'react';

export const Item = ({ item, fetchItem }) => {

  return <>
    <div class="card">
      <div className="card-img-container">
        <img className='card-img' src={item.image} alt={item.name} />
      </div>
        <h4 className="card-text">{item.name}</h4>
      <div>
        <button className='card-button card-button-delete'>Delete</button>
        <button className='card-button card-button-edit'>Edit</button>
      </div>
      <div className='card-buy'>
        <h4 className='card-price'>{item.price}$</h4>
        <button 
          className='card-button card-button-addtocart'
          onClick={() => fetchItem(item.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </>
} 
	