import React, { useState, useEffect } from 'react';
import { Header } from './Header'
import { Footer } from './Footer';
import { Form } from './Form';
// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const App = ({ fetchItems }) => {
  const [formIsActive, setFormIsActive] = useState(false)

	// const [items, setItems] = useState([]);

	return (
		<main className='container'>	
      <Header setFormIsActive={setFormIsActive}/>

      {formIsActive && 
        <Form setFormIsActive={setFormIsActive} fetchItems={fetchItems}/>
      }

      <Footer />
		</main>
	)
}
