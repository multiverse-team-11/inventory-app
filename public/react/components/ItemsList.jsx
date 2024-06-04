import React, { useState } from 'react';
import { Item } from './Item';
import { useNavigate } from 'react-router-dom';
import apiURL from '../api';

export const ItemsList = ({ items }) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState([])

  async function fetchItem (itemId) {
    try {
      const res = await fetch(`${apiURL}/items/${itemId}`)
      const itemData = await res.json()
      console.log(itemData)
      setCurrentPage(itemData)
      navigate('/item', { state: { item: itemData} })
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
