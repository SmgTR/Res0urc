import React from 'react';

const SaveList = ({ text, icon, add }) => {
  return (
    <div className="flex save" onClick={add}>
      <h2>{text}</h2>
      <i className={`${icon}`}></i>
    </div>
  );
};

export default SaveList;
