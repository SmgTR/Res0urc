import React, { useEffect, Fragment } from 'react';

const WelcomeNav = ({ setLogin, login }) => {
  useEffect(() => {
    function show(e) {
      if (
        e.target.classList.contains('loginTrigger') ||
        e.target.parentElement.classList.contains('loginTrigger')
      ) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }

    document.addEventListener('click', show);
  }, []);

  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <a href='#start'>Get Started</a>
          </li>
          {/* <li>
						<a href='#pricing'>Pricing</a>
					</li> */}
          <li>
            <a href='#' className='loginTrigger'>
              Login
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default WelcomeNav;
