import React, { useState, useEffect } from 'react'
import { ItemsList } from '../components/ItemsList';
import { Form } from '../components/Form';

export const ItemsList = ({ 
  items, 
  fetchItems, 
  selectedItem, 
  setSelectedItem,
  formIsActive,
  setFormIsActive
}) => {

	useEffect(() => {
		fetchItems();
	}, []);

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