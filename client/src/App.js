import './sass/main.scss';
import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Navbar from './components/layout/Nav/Navbar';
import Nav from './components/layout/Nav/Nav';
import UsersState from './components/context/users/UsersState';
import ResState from './components/context/resources/ResState';

import NotFound from './components/utils/NotFound';
import Footer from './components/layout/Footer/Footer';
import HomeWelcome from './components/layout/Home/HomeWelcome';
import Slide from './components/layout/tutorial/Slide';
import MenuToogle from './components/layout/Nav/MenuToogle';

function App() {
  const user = localStorage.getItem('token');

  const [showTutorial, setShowTutorial] = useState(false);
  const tutorial = localStorage.getItem('tutorial');

  useEffect(() => {
    if (tutorial === 'true') {
      setShowTutorial(true);
    }
  }, [showTutorial]);

  return (
    <UsersState>
      <ResState>
        <Router>
          <Switch>
            <Route exact path='/'>
              {showTutorial === true ? <Slide hide={setShowTutorial} /> : ''}
              {user ? (
                <Fragment>
                  <Navbar />
                  <div className='container'>
                    <MenuToogle />
                    <Nav />

                    <div className='content'>
                      <Home />
                    </div>
                  </div>
                </Fragment>
              ) : (
                <HomeWelcome />
              )}
            </Route>

            <Route exact path='/login'>
              <Login />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </ResState>
    </UsersState>
  );
}

export default App;
