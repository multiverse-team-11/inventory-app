import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { Header } from './Header'
import { Footer } from './Footer';
// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const App = () => {

	const [sauces, setSauces] = useState([]);

	async function fetchSauces(){
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();
			
			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchSauces();
	}, []);

	return (
		<main>	
      
      <Header />

      <h1>Sauce Store</h1>
			<h2>All things 🔥</h2>
			<SaucesList sauces={sauces} />

      <Footer />
		</main>
	)
}
