import React, { useState, useEffect } from 'react';
import { Header } from './Header'
import { Footer } from './Footer';
import { ItemsList } from './ItemsList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const App = () => {

	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isAddingItem, setIsAddingItem] = useState(false);
    const [formIsActive, setFormIsActive] = useState(false)

	function goHome() {
		setSelectedItem(null)
		setIsAddingItem(false)
	}

	async function handleClick(slug) {
		const response = await fetch(`${apiURL}/items/${slug}`)
		const pageData = await response.json()
		setSelectedItem(pageData)
	  }

	async function addItem(item) {
		const response = await fetch(`${apiURL}/items`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(item)
		})
    
		const newItem = await response.json()
		setItems([...items, newItem])
		setIsAddingItem(false)
	}

	useEffect(() => {
		async function fetchItems(){
			try {
				const response = await fetch(`${apiURL}/items`);
				const itemsData = await response.json();
				
				setItems(itemsData);
			} catch (err) {
				console.log("Oh no an error! ", err)
			}
		}

		fetchItems();
	}, []);

	useEffect(() => {
	  if (selectedItem) {
		document.title = `${selectedItem.title} - Inventory App`
	  } else if (isAddingItem) {
		document.title = 'Add an item - Inventory App'
	  } else {
		document.title = 'Inventory App'
	  }
	}, [selectedItem, isAddingItem])

	if (isAddingItem) {
		return <Form 
			addItem={addItem} 
			goHome={goHome} 
		/>
	}

	if (selectedItem) {
		return <Item {...selectedItem} 
			goHome={goHome} 
		/>
	}

	return (
		<main>	
      <Header />

			<ItemsList items={items} />

      <Footer />
		</main>
	)
}
