import React, { useState, useContext } from 'react';
import Logo from '../Nav/Logo';
import WelcomeNav from '../Welcome/WelcomeNav';
import WelcomeHero from '../Welcome/WelcomeHero';
import WelcomeExtension from '../Welcome/WelcomeExtension';
import WelcomeRegister from '../Welcome/WelcomeRegister';
import WelcomePricing from '../Welcome/WelcomePricing';
import LoginForm from '../Welcome/LoginForm';
import UsersContext from '../../context/users/usersContext';
import WelcomeRegisterForm from '../Welcome/WelcomeRegisterForm';

const HomeWelcome = () => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const usersContext = useContext(UsersContext);

  const { loginUser, feedbackMsg } = usersContext;
  return (
    <div className='homeWelcome'>
      {register ? <WelcomeRegisterForm setRegister={setRegister} /> : null}

      <header className='header'>
        <Logo />
        <WelcomeNav setLogin={setLogin} login={login} />
      </header>
      {login ? <LoginForm login={loginUser} msg={feedbackMsg} /> : null}
      <section className='hero__section'>
        <WelcomeHero />
      </section>
      <section className='create__account' id='start'>
        <WelcomeRegister setRegister={setRegister} />
      </section>

      <section className='extension__section'>
        <WelcomeExtension />
      </section>
      {/* <section className='pricing' id='pricing'>
				<h1>Choose your pricing monthly plan:</h1>
				<div className='pricing__container flex' id='pricing'>
					<WelcomePricing
						type='Free'
						price='0$ per month'
						listNumb='2'
						bookmarks='10'
						extension='No access'
					/>
					<WelcomePricing
						type='Premium'
						price='5$ per month'
						listNumb='20'
						bookmarks='Unlimited'
						extension='Access'
					/>
				</div>
			</section> */}
    </div>
  );
};

export default HomeWelcome;
