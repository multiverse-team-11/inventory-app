import React, { useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Item } from './pages/Item'
import { ItemsPage } from './pages/ItemsList'
import { App } from './components/App'
import apiURL from './api';

export const Root = () => {
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
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<ItemsPage 
            items={items} 
            fetchItems={fetchItems} 
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            formIsActive={formIsActive}
            setFormIsActive={setFormIsActive}
          />}/>
          <Route path='item' element={<Item 
            fetchItems={fetchItems} 
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            formIsActive={formIsActive}
            setFormIsActive={setFormIsActive}
          />}/>
        </Route>
      </Routes>
    </Router>
  )
}
