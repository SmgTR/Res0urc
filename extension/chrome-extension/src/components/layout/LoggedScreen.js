import React, { Fragment, useContext } from 'react';
import Header from './Header';
import Popular from './Popular';
import UserRes from './UserRes';
import Footer from './Footer';
import ResContext from '../context/resources/resContext';
import Links from './Links';

const LoggedScreen = () => {
  const resContext = useContext(ResContext);

  const { current } = resContext;

  return (
    <Fragment>
      <div className='container'>
        <Header />
        <main>
          {!current ? (
            <Fragment>
              <Popular />
              <UserRes />
            </Fragment>
          ) : (
            <Links />
          )}
        </main>
      </div>
      <Footer />
    </Fragment>
  );
};

export default LoggedScreen;
