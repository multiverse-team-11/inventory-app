import React from 'react';

export const Sauce = (props) => {

  return <>
    <div class="card">
      <img className='card-img' src={props.sauce.image} alt={props.sauce.name} />
      <h3>{props.sauce.name}</h3>
    </div>
  </>
} 
	