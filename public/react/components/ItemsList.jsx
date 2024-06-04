import React, { useState } from 'react';
import { Item } from './Item';
import apiURL from '../api';

export const ItemsList = ({ items }) => {
  const [currentPage, setCurrentPage] = useState([])

  async function fetchItem (itemId) {
    try {
      const res = await fetch(`${apiURL}/items/${itemId}`)
      const itemData = res.json()
      console.log(itemData)
      setCurrentPage(itemData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

	return <div className='card-list'>
		{
			items.map((item, idx) => {
				return <Item 
          item={item} 
          key={idx} 
          fetchItem={fetchItem} 
        />
			})
		}
	</div>
} 
