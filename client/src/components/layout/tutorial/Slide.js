import React, { useState } from 'react';
import SlideImg from './SlideImg';
import SlideTitle from './SlideTitle';
import select from '../../../assets/select.png';
import windowBlock from '../../../assets/windowBlock.png';
import BottomNav from './BottomNav';

const Slide = ({ hide }) => {
  const platform = window.navigator.platform;

  const shortcut = platform === 'MacIntel' ? 'Cmd  ⌘' : 'Alt';

  const [tutorialCard, setTutorialCard] = useState({
    number: 0,
    content: [
      {
        img: select,
        title: `To select card use ${shortcut} + left mouse click.`,
      },
      { img: windowBlock, title: 'Allow popup windows in your browser.' },
    ],
  });

  const dissmisTutorial = () => {
    localStorage.setItem('tutorial', false);
    hide(false);
  };

  const resetDot = (e) => {
    const parent = e.target.parentNode.childNodes;
    //reset active dot class
    for (let i = 0; i < parent.length; i++) {
      if (parent[i].classList.contains('active__dot')) {
        parent[i].classList = 'tutorial__navigation__dot';
      }
    }
  };

  const dotClick = (e) => {
    resetDot(e);

    const number = e.target.dataset.slide * 1;
    setTutorialCard({ ...tutorialCard, number: number });

    //add active dot class
    e.target.classList.add('active__dot');
  };

  const arrowClick = (e, checkDot) => {
    let numb = 0;
    resetDot(e);
    console.log(tutorialCard.number);
    if (
      e.target.classList.contains('fa-chevron-left') &&
      !tutorialCard.number == 0
    ) {
      setTutorialCard({ ...tutorialCard, number: tutorialCard.number - 1 });

      numb = tutorialCard.number - 1;
    } else if (
      e.target.classList.contains('fa-chevron-right') &&
      tutorialCard.number === tutorialCard.content.length + 1
    ) {
      numb = tutorialCard.number - 1;
      setTutorialCard({ ...tutorialCard, number: tutorialCard.number + 1 });
    }

    if (
      e.target.classList.contains('fa-chevron-right') &&
      tutorialCard.number < tutorialCard.content.length - 1
    ) {
      setTutorialCard({ ...tutorialCard, number: tutorialCard.number + 1 });

      numb = tutorialCard.number + 1;
    } else if (
      e.target.classList.contains('fa-chevron-right') &&
      tutorialCard.number === tutorialCard.content.length - 1
    ) {
      numb = tutorialCard.number - 1;
      setTutorialCard({ ...tutorialCard, number: tutorialCard.number - 1 });
    }
    checkDot(e, numb);
  };

  const checkDot = (e, num) => {
    const parent = e.target.parentNode.childNodes;
    //reset active dot class
    for (let i = 0; i < parent.length; i++) {
      if (+parent[i].dataset.slide === num) {
        parent[i].classList.add('active__dot');
        console.log(parent[i]);
      }
    }
  };

  const number = tutorialCard.number;

  return (
    <div className='tutorial'>
      <div className='tutorial__card'>
        <div className='tutorial__welcome'>
          <h1>Thank you for joining us!</h1>
          <span onClick={dissmisTutorial}>x</span>
        </div>
        <h2 className='tutorial__subwelcome'>
          Please checkout our short tutorial.
        </h2>

        <SlideImg img={tutorialCard.content[number].img} />
        <SlideTitle title={tutorialCard.content[number].title} />
        <div className='tutorial__navigation'>
          <BottomNav
            dotClick={dotClick}
            arrowClick={arrowClick}
            checkDot={checkDot}
          />
          <p className='skip' onClick={dissmisTutorial}>
            Skip
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide;
