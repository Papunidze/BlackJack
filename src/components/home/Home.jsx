import React, { useState } from "react";
import "./home.css";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const Home = () => {
  const [showRulest, setShowRules] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  return (
    <div className="container__menu">
      <div
        className="menu__button"
        style={{ display: showRulest || showCreator ? "none" : "flex" }}
      >
        <div className="buttons__container">
          <Link to="/table">
            <button className="start__game">Start Play</button>
          </Link>
          <button className="rules__menu" onClick={() => setShowRules(true)}>
            Rules
          </button>
          <button
            className="creator__button"
            onClick={() => setShowCreator(true)}
          >
            Creator
          </button>
        </div>
      </div>
      <div
        className="rules__container"
        style={{ display: showRulest ? "flex" : "none" }}
      >
        <div className="rules__blackjack">
          <div className="head__rules">
            <h1>Blackjack Rules</h1>
            <RiCloseLine
              onClick={() => setShowRules(false)}
              className="icon__x"
            />
          </div>
          <span>
            <h1>DOUBLE-DOWN OR DRAW!</h1>
            Blackjack is an incredibly popular, exciting and easy card game to
            play. The object is to have a hand with a total value higher than
            the dealer’s without going over 21. Kings, Queens, Jacks and Tens
            are worth a value of 10. An Ace has the value of 1 or 11. The
            remaining cards are counted at face value.
            <h1>HOW TO PLAY</h1> Place a bet in the betting areas marked on the
            table. You and fellow players are dealt two cards each whilst the
            dealer is dealt one face up. If your first 2 cards add up to 21 (an
            Ace and a card valued 10), that’s Blackjack! If they have any other
            total, decide whether you wish to ‘draw’ or ‘stay’. You can continue
            to draw cards until you are happy with your hand. Once all players
            have taken their turn the dealer draws another card for their hand.
            They must draw until they reach 17 or more.
            <h1>RULES</h1> Once all cards are drawn, whoever has a total closer
            to 21 than the dealer wins. If player’s hand and dealer’s hand have
            an equal value, it’s a tie. All winning bets are paid 1/1 but when
            you get Blackjack you get paid 3/2.
          </span>
        </div>
      </div>
      <div
        className="creator__text"
        style={{ display: showCreator ? "flex" : "none" }}
      >
        <RiCloseLine
          onClick={() => setShowCreator(false)}
          className="icon__x"
        />
        <h1>Creator: Giga Papunidze</h1>
        <h1>
          Github: <a href="https://github.com/Papunidze">Papunidze</a>
        </h1>
        <h1>
          Facebook:
          <a href="https://www.facebook.com/Papunidze13/">Giga Papunidze</a>
        </h1>
      </div>
    </div>
  );
};

export default Home;
