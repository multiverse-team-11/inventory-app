import React, { useEffect, useState } from 'react'
import apiURL from '../api'

export const Forms = (props) => {
  const [data, setData] = useState({
      name: '',
      price: '',
      description: '',
      category: '',
      image: '',
  })

  function handleChange(event) {
      setData({
          ...data,
          [event.target.name]: event.target.value
      })
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      props.addItem(data)
  };

  return <>
    <div className="overlay">
      <button 
        type="button"
        className="backButton" 
        onClick={props.goHome}
      >
        Back
      </button>
      <form className='addForm' onSubmit={handleSubmit}>
        <h2>Add Page</h2>
        <input 
          className='form-field'
          placeholder='Name'
          type='text'
          name='name'
          id='name'
          value={data.name}
          onChange={handleChange}
        ></input>
        <textarea 
          className='form-field'
          placeholder='Description'
          type='text'
          name='description'
          id='description'
          value={data.description}
          onChange={handleChange}
        ></textarea>
        <input className='form-field'
          placeholder='Category'
          type='text'
          name='category'
          id='category'
          value={data.category}
          onChange={handleChange}
        ></input>
        <input className='form-field'
          placeholder='Price'
          type='text'
          name='price'
          id='price'
          value={data.price}
          onChange={handleChange}
        ></input>
        <input className='form-field'
          placeholder='Img URL'
          type='text'
          name='image'
          id='image'
          value={data.image}
          onChange={handleChange}
        ></input>
        <button className='button-create' type='submit'>Create Item</button>
      </form>
    </div>
  </>
}
