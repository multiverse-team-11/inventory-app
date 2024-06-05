import React, { useEffect, useState } from 'react'
import apiURL from '../api'

export const Form = ({ setFormIsActive, selectedItem, fetchItems }) => {
  const [name, setName] = useState(selectedItem?.name || '')
  const [description, setDescription] = useState(selectedItem?.description || '')
  const [category, setCategory] = useState(selectedItem?.category || '')
  const [price, setPrice] = useState(selectedItem?.price || '')
  const [imgUrl, setImgUrl] = useState(selectedItem?.imgUrl || '')

  // ADD/UPDATE the item
  async function onHandleClick (e) {
    e.preventDefault()
    const itemData = {
      name,
      description,
      category,
      price,
      imgUrl
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
      setImgUrl('')
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          type='text'
        ></input>
        <textarea className='form-field'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          type='text'
        ></textarea>
        <input className='form-field'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Category'
          type='text'
        ></input>
        <input className='form-field'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price'
          type='text'
        ></input>
        <input className='form-field'
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          placeholder='Img URL'
          type='text'
        ></input>
        <button className='button-create' type='submit'>{selectedItem ? 'Update Item' : 'Create Item'}</button>
      </form>
    </div>
  </>
}
