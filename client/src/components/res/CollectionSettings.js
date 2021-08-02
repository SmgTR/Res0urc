import React, { useContext, useState } from 'react';
import BackArrow from '../utils/BackArrow';
import ResContext from '../context/resources/resContext';
import checkImage from '../utils/checkImage';
import defaultCover from '../../assets/defaultCover.png';

const CollectionSettings = () => {
  const resContext = useContext(ResContext);
  const {
    collectionSettings,
    current,
    setPreview,
    preview,
    updateCollection,
    infoMsg,
    setInfoMsg,
  } = resContext;

  const [collection, setCollection] = useState({
    name: '',
    description: '',
    cover: '',
    public: false,
  });
  const onChange = (e) => {
    if (e.target.name === 'cover') {
      checkImage(e.target.value, (exists) => {
        if (exists) {
          setPreview(e.target.value);
        } else {
          setPreview(defaultCover);
        }
      });
    }

    if (e.target.name === 'name' && e.target.value.length > 20) {
      e.target.classList.add('error__border');
      setInfoMsg(
        false,
        'A collection name cannot be longer than 20 characters'
      );
    } else if (e.target.name === 'name' && e.target.value.length < 30) {
      e.target.classList.remove('error__border');
      e.target.classList.add('success__border');

      setInfoMsg(false, '');
    }

    if (e.target.name === 'description' && e.target.value.length > 140) {
      e.target.classList.add('error__border');
      setInfoMsg(
        false,
        'A collection description cannot be longer than 140 characters'
      );
    } else if (e.target.name === 'description' && e.target.value.length < 140) {
      e.target.classList.remove('error__border');
      e.target.classList.add('success__border');

      setInfoMsg(false, '');
    }

    setCollection({ ...collection, [e.target.name]: e.target.value });
  };

  const check = (e) => {
    setCollection({ ...collection, public: e.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const fields = Object.keys(collection).map((key) => {
      if (collection[key] !== '') {
        if (!infoMsg.msg) updateCollection({ [key]: collection[key] });
      }
    });
  };

  return (
    <div className='collections collSettings'>
      <BackArrow click={() => collectionSettings(false)}>
        <h1>Collection</h1>
      </BackArrow>
      <p className='error col__setting__err'>{infoMsg ? infoMsg.text : ''}</p>
      <div className='change__settings inputs__default'>
        <form onSubmit={onSubmit}>
          <label htmlFor='name'>Collection Title:</label>
          <input
            type='text'
            placeholder={current[0].name}
            name='name'
            onChange={onChange}
          />
          <label htmlFor='description'>Description:</label>

          <input
            type='text'
            name='description'
            placeholder={current[0].description}
            onChange={onChange}
          />
          <label className='switch flex'>
            <label htmlFor='check'>Public:</label>
            <input
              type='checkbox'
              name='check'
              className='checkboxPublic'
              onClick={check}
            />
            <span className='slider round' />
          </label>
          <label htmlFor='cover'>Cover:</label>
          <input
            type='text'
            placeholder={current[0].cover}
            name='cover'
            onChange={onChange}
          />
          <img src={preview} className='preview' />
          <button className='add mt-small'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default CollectionSettings;
