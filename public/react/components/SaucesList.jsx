import React from 'react';
import { Sauce } from './Sauce';

export const SaucesList = ({sauces}) => {
	return <div className='card-list'>
		{
			sauces.map((sauce, idx) => {
				return <Sauce sauce={sauce} key={idx} />
			})
		}
	</div>
} 
