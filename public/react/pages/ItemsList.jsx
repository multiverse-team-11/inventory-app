import React, { useState, useEffect } from 'react'
import { ItemsList } from '../components/ItemsList';

import apiURL from '../api'

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [formIsActive, setFormIsActive] = useState(false)

	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemsData = await response.json();
			
			setItems(itemsData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchItems();
	}, []);

  return (
    <main className='content'>
			<ItemsList items={items} />
    </main>
  )
}