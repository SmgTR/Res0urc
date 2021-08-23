import React from 'react';

const BackArrow = ({ children, click }) => {
  return (
    <div className="backArrow flex" onClick={click}>
      <i className="fas fa-arrow-left" />
      {children}
    </div>
  );
};

export default BackArrow;
