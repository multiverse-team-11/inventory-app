import React, { useState, useEffect } from 'react'
import { ItemsList } from '../components/ItemsList';
import { Form } from '../components/Form';

import apiURL from '../api'

export const ItemsPage = () => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
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

  // console.log(selectedItem)

  return (
    <main className='content'>
			<ItemsList 
        items={items} 
        fetchItems={fetchItems} 
        setSelectedPage={setSelectedItem}
        setFormIsActive={setFormIsActive}
      />

      {formIsActive && 
        <Form 
          setFormIsActive={setFormIsActive}
          selectedItem={selectedItem}
          fetchItems={fetchItems} 
        />
      }
    </main>
  )
}