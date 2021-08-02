import React, { useState, Fragment, useContext } from 'react';

import ResContext from '../context/resources/resContext';
import checkImage from '../utils/checkImage';
import defaultCover from '../../assets/defaultCover.png';

const AddItemList = ({ show, back }) => {
	const resContext = useContext(ResContext);

	const [ fetched, setFetched ] = useState(false);
	const [ letters, setLetters ] = useState(0);
	const [ item, setItem ] = useState({
		url: '',
		image: '',
		title: '',
		description: '',
		type: '',
		video: ''
	});

	const { url, image, title, description, video } = item;

	const {
		fetchLinkInfo,
		metaData,
		addListItem,
		preview,
		setPreview
	} = resContext;

	const getLinkMeta = () => {
		if (!metaData) {
			return null;
		}

		const data = metaData.map((meta) => {
			return Object.keys(meta).reduce((total, cur) => {
				return total.concat(cur);
			});
		});

		const obj = {
			url: '',
			image: '',
			title: '',
			description: '',
			type: '',
			video: ''
		};
		obj.url = item.url;
		data.map((key) => {
			if (key === 'video:secure_url') {
				key = 'video';
			}

			if (key in item) {
				metaData.map((meta) => {
					if (meta[key]) obj[key] = meta[key];

					if (
						key === 'video' &&
						meta['video:secure_url'] !== undefined
					) {
						obj[key] = meta['video:secure_url'];
					}
				});
			}
		});

		setItem({ ...obj });

		checkImage(obj.image, (exists) => {
			if (exists) {
				setPreview(obj.image);
			} else {
				setPreview(defaultCover);
			}
		});

		setLetters(obj.description.length);

		if (item.url !== '') {
			setFetched(true);
		}
	};

	const setDefault = (e) => {
		e.preventDefault();
		console.log('dada');
		const obj = { ...item };

		if (preview === defaultCover) {
			item.image = '../defaultCover';
			return onSubmit();
		}

		return onSubmit();
	};

	const onSubmit = (e) => {
		addListItem({ ...item });
		back();
	};

	const onChange = (e) => {
		//preview image
		if (e.target.name === 'image')
			checkImage(e.target.value, (exists) => {
				if (exists) {
					setPreview(e.target.value);
				} else {
					setPreview(defaultCover);
				}
			});
		//description available characters
		if (e.target.name === 'description') {
			setLetters(e.target.value.length);
		}

		if (e.target.name === 'url' && e.target.value !== '') {
			fetchLinkInfo(e.target.value);
		}

		setItem({ ...item, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<form onSubmit={setDefault} className='add__item-form'>
				<div className='form-group get__url'>
					<label htmlFor='url'>URL Address</label>
					<div className='flex'>
						<input
							id='url'
							type='text'
							name='url'
							value={url}
							placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
							onChange={onChange}
							required
						/>

						<div className='get__url-btn' onClick={getLinkMeta}>
							<i className='fas fa-arrow-right' />
						</div>
					</div>
				</div>
				{fetched && (
					<Fragment>
						<img src={preview} className='preview' />

						<div className='form-group'>
							<label htmlFor='image'>Image URL</label>
							<input
								id='image'
								type='text'
								name='image'
								value={image}
								placeholder='https://pexels.com/twopack.jpg'
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='title'>Title</label>
							<input
								id='title'
								type='text'
								name='title'
								value={title}
								placeholder='Rick Astley - Never Gonna Give You Up (Video) - YouTube'
								onChange={onChange}
								required
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='description'>Description</label>
							<textarea
								id='description'
								type='text'
								name='description'
								value={description}
								placeholder='Never gonna give you up
                Never gonna let you down
                Never gonna run around and desert you'
								onChange={onChange}
								maxLength='160'
								required
							/>
						</div>
						<p
							className='counter'
							style={{
								color: letters >= 160 ? '#fc8888' : '#efdcdc'
							}}
						>
							{letters}/160
						</p>
						<div className='form-group'>
							<label htmlFor='video'>Video URL</label>
							<input
								id='video'
								type='text'
								name='video'
								value={video}
								placeholder=' https://www.youtube.com/embed/dQw4w9WgXcQ'
								onChange={onChange}
							/>
						</div>
						<button className='add'>Add</button>
					</Fragment>
				)}
			</form>
		</div>
	);
};

export default AddItemList;
