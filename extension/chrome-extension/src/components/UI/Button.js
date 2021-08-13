import React from 'react';

const Button = ({ text, stylingClass }) => {
  return <button className={`btn ${stylingClass}`}>{text}</button>;
};

export default Button;
