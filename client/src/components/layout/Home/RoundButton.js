import React, { Fragment } from 'react';

const RoundButton = ({ text, openSelected }) => {
	return (
		<Fragment>
			<h2 className='background-rounded' onClick={openSelected}>
				{text}
			</h2>
		</Fragment>
	);
};

export default RoundButton;
