import React, { useState } from 'react';
import DefaultCover from '../../assets/defaultCover.png';

const LinksItem = ({ link, addSelect, removeSelect }) => {
	const { description, title, image, type, url, video, _id } = link;

	const [ borderSelected, setBorderSelected ] = useState(false);

	const select = (e) => {
		const key = window.navigator.platform.toLowerCase().includes('mac')
			? e.metaKey
			: e.altKey;
		if (key) {
			setBorderSelected(!borderSelected);

			const itemId = _id;

			borderSelected
				? removeSelect(itemId)
				: addSelect({ id: itemId, url });
		}
	};
	const pointer = (e) => {
		const key = window.navigator.platform.toLowerCase().includes('mac')
			? e.metaKey
			: e.altKey;
		if (e.metaKey) {
			e.target.classList.add('pointer');
		} else {
			e.target.classList.remove('pointer');
		}
	};

	return (
		<div
			className={`link ${borderSelected ? 'selected pointer' : ''}`}
			onClick={select}
			onMouseOver={pointer}
			id={_id}
		>
			{type.includes('video') ? (
				<iframe
					src={video}
					title='YouTube video player'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
				/>
			) : (
				<img src={image === '../defaultCover' ? DefaultCover : image} />
			)}

			<div className='link__text'>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<a
				href={url.includes('http') ? url : '//' + url}
				target='_blank'
				className='link__open'
			>
				Open
			</a>
		</div>
	);
};

export default LinksItem;
