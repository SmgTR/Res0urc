import React, { Fragment } from 'react';

const Input = (props) => {
  const label = props.label[0].toUpperCase() + props.label.slice(1);
  return (
    <Fragment>
      <label htmlFor={props.label}>{label}</label>
      <input className='input' {...props.input} onChange={props.onChange} />
    </Fragment>
  );
};

export default Input;
