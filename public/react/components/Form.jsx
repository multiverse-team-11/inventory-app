import React, { useEffect, useState } from 'react'
import apiURL from '../api'

export const Form = ({ setFormIsActive }) => {
  return <>
    <div className="overlay">
      <form className='addForm'>
        <h2>Add Page</h2>
        <button onClick={() => setFormIsActive(false)}>Close</button>
        <input className='form-field'
          placeholder='Name'
          type='text'
        ></input>
        <textarea className='form-field'
          placeholder='Description'
          type='text'
        ></textarea>
        <input className='form-field'
          placeholder='Category'
          type='text'
        ></input>
        <input className='form-field'
          placeholder='Price'
          type='text'
        ></input>
        <input className='form-field'
          placeholder='Img URL'
          type='text'
        ></input>
        <button className='button-create' type='submit'>Create Page</button>
      </form>
    </div>
  </>
}
