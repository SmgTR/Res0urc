import React, { Fragment, useState } from 'react';
import LinksItem from './LinksItem';

const Links = ({ links, addSelect, removeSelect }) => {
	return (
		<Fragment>
			{links.map((link) => {
				return (
					<LinksItem
						key={link._id}
						link={link}
						addSelect={addSelect}
						removeSelect={removeSelect}
					/>
				);
			})}
		</Fragment>
	);
};

export default Links;
