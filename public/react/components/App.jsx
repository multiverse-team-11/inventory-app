import React, { useState, useEffect } from 'react';
import { Header } from './Header'
import { Footer } from './Footer';
// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { ItemsList } from './ItemsList';


export const App = () => {

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
		<main>	
      <Header />

			<ItemsList items={items} />

      <Footer />
		</main>
	)
}
