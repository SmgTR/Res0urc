import React, { useState, useEffect } from 'react';
import checkImage from '../utils/checkImage';
import defaultCover from '../../assets/defaultCover.png';

const AddCollectionForm = ({
  preview,
  setPreview,
  add,
  setInfoMsg,
  infoMsg,
}) => {
  const [collection, setCollection] = useState({
    name: '',
    description: '',
    cover: '',
    public: false,
  });

  useEffect(() => {
    setPreview(defaultCover);
  }, []);

  const onChange = (e) => {
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

    if (e.target.name === 'cover') {
      checkImage(e.target.value, (exists) => {
        if (exists) {
          setPreview(e.target.value);
        } else {
          setPreview(defaultCover);
        }
        console.log(collection.cover);
      });
    }

    setCollection({ ...collection, [e.target.name]: e.target.value });
  };

  const setDefaultAndSubmit = (e) => {
    e.preventDefault();

    const onSubmit = () => {
      if (!infoMsg.msg) add(collection);
    };

    if (preview === defaultCover) {
      setCollection({
        ...collection,
        cover: '../assets/defaultCover.png',
      });
      if ((collection.cover = '../assets/defaultCover.png')) onSubmit();
    } else {
      onSubmit();
    }
  };

  const check = (e) => {
    setCollection({ ...collection, public: e.target.checked });
    console.log(collection);
  };

  return (
    <div className='collections addCollection'>
      <h1 className='collection__title'>Add Resources list</h1>
      <p className='error col__setting__err'>{infoMsg ? infoMsg.text : ''}</p>

      <form
        onSubmit={setDefaultAndSubmit}
        className='addCollection__form inputs__default'
      >
        <label htmlFor='name'>Collection title:</label>
        <input
          type='text'
          name='name'
          placeholder='Title'
          onChange={onChange}
        />

        <label htmlFor='description'>Description:</label>
        <input
          type='text'
          name='description'
          placeholder='Describe your collection'
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
          name='cover'
          placeholder='URL address'
          onChange={onChange}
        />
        <img src={preview} className='preview' />
        <button className='add mt-small'>Add</button>
      </form>
    </div>
  );
};

export default AddCollectionForm;
