import React, { useState, useEffect } from 'react';
import { Header } from './Header'
import { Footer } from './Footer';
import { Form } from './Form';
// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const App = () => {
  const [formIsActive, setFormIsActive] = useState(false)

	const [items, setItems] = useState([]);

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
		<main className='container'>	
      <Header setFormIsActive={setFormIsActive}/>

      {formIsActive && 
          <Form setFormIsActive={setFormIsActive}/>
      }

      <Footer />
		</main>
	)
}
