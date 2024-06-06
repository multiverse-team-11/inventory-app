import React, { useState } from 'react';
import { Item } from './Item';
import { useNavigate } from 'react-router-dom';
import apiURL from '../api';

export const ItemsList = ({ items, fetchItems, setSelectedPage, setFormIsActive}) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

	return <>
  <div className="search-container">
    <input
      className='search-bar'
      type='text'
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder='Search items...'
    />
  </div>
  <div className='card-list'>
		{
			filteredItems.map((item, idx) => {
				return <Item 
          item={item} 
          key={idx} 
          fetchItem={fetchItem} 
          fetchItems={fetchItems}
          setFormIsActive={setFormIsActive}
          setSelectedPage={setSelectedPage}
        />
			})
		}
	</div>
  </>
} 
