import React from 'react';
import browse from '../../../assets/browse.svg';

const WelcomeHero = () => {
	return (
		<div className='hero'>
			<h1>
				Build your web links workspaces and manage your bookmarks on
				every device.
			</h1>

			<img src={browse} />
		</div>
	);
};

export default WelcomeHero;
