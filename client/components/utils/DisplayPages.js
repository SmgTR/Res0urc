import React, { useState, useEffect } from 'react';

const DisplayPages = ({ pages, getPage }) => {
  const [numberActive, setNumber] = useState(1);
  let numbers = [];
  for (let i = 1; i <= pages; i++) {
    numbers.push(i);
  }

  useEffect(() => {
    getPage(numberActive);
  }, [numberActive]); //

  const changeNumber = e => {
    setNumber(+e.target.textContent);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex pages">
      {numbers.map(number => {
        return (
          <p
            className={number === numberActive ? 'active' : null}
            key={number}
            onClick={changeNumber}
          >
            {number}
          </p>
        );
      })}
    </div>
  );
};

export default DisplayPages;
