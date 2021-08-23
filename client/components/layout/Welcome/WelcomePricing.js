import React from 'react';

const WelcomePricing = ({ type, price, listNumb, bookmarks, extension }) => {
	return (
		<div className='table'>
			<div className='type'>
				<h1>{type}</h1>
				<h1>Price: {price}</h1>
				<h1>Number of created lists: {listNumb}</h1>
				<h1>Number of bookmarks: {bookmarks}</h1>
				<h1>Chrome extension: {extension}</h1>
			</div>
		</div>
	);
};

export default WelcomePricing;
