import React from 'react';
import DefaultCover from '../../../assets/defaultCover.png';
import AllRes from '../../res/AllRes';

const CollectionItem = ({ data }) => {
	const {
		author,
		links,
		name,
		cover,
		title,
		description,
		addedToBookmark
	} = data;

	return (
		<div className='link collections-item' key={data._id}>
			<img
				src={
					cover === '../assets/defaultCover.png' ? (
						DefaultCover
					) : (
						cover
					)
				}
			/>
			<div className='link__text'>
				<div className='link__text-collection'>
					<div style={{ display: 'flex' }}>
						<h2>{name}</h2>
						<p style={{ textAlign: 'right' }}>
							<i className='fas fa-bookmark' />{' '}
							{addedToBookmark.length}
						</p>
					</div>
					<p className='res__description'>{description}</p>

					<p
						className='links__count'
						style={{ fontSize: '1.2rem', marginTop: '-1rem' }}
					>
						Links: {links.length}/20
					</p>
				</div>
			</div>
		</div>
	);
};

export default CollectionItem;
