import React, { useEffect, useState } from 'react'
import apiURL from '../api'

export const Form = ({ setFormIsActive, selectedItem, fetchItems }) => {
  const [name, setName] = useState(selectedItem?.name || '')
  const [description, setDescription] = useState(selectedItem?.description || '')
  const [category, setCategory] = useState(selectedItem?.category || '')
  const [price, setPrice] = useState(selectedItem?.price || '')
  const [image, setImage] = useState(selectedItem?.image || '')

  // ADD/UPDATE the item
  async function onHandleClick (e) {
    e.preventDefault()
    const itemData = {
      name,
      description,
      category,
      price,
      image
    }

    console.log('Sending item data:', itemData)

    try {
      const response = selectedItem
      ? await fetch(`${apiURL}/items/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
      })
      : await fetch(`${apiURL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
      })

      const data = await response.json()
      console.log('Response data:', data)

      setName('')
      setDescription('')
      setCategory('')
      setPrice('')
      setImage('')
      setFormIsActive(false)
      fetchItems()

    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  return <>
    <div className="overlay">
      <form className='addForm' onSubmit={onHandleClick}>
        <div className="form-title">
          <h2>{selectedItem ? 'Edit Item' : 'Add Item'}</h2>
          <button className='form-close' type="button" onClick={() => setFormIsActive(false)}>Close</button>
        </div>
        <input className='form-field'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          type='text'
        ></input>
        <textarea className='form-field'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          type='text'
        ></textarea>
        <input className='form-field'
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Category'
          type='text'
        ></input>
        <input className='form-field'
          name='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price'
          type='text'
        ></input>
        <input className='form-field'
          name='image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='Image URL'
          type='text'
        ></input>
        <button className='button-create' type='submit'>{selectedItem ? 'Update Item' : 'Create Item'}</button>
      </form>
    </div>
  </>
}
