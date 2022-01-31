import React, { useEffect, useState } from "react";
import Cheaps from "./cheap";
import { CircularProgressbar } from "react-circular-progressbar";
import Swal from "sweetalert2";
import hand from "../../resource/hand.png";
import backCard from "../../resource/Cards/cardBack_red3.png";
import { FaMinusCircle, FaCode } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import selectHand from "../../resource/selectHand.png";
import useSound from "use-sound";
import CardSound from "../../resource/Bonus/cardPlace1.ogg";
import CheapsSound from "../../resource/Bonus/chipsCollide1.ogg";
import CheapsSound2 from "../../resource/Bonus/chipsCollide2.ogg";
import SplitcardSound from "../../resource/Bonus/cardSlide1.ogg";
import dealerCardsound from "../../resource/Bonus/cardPlace2.ogg";
import Card from "./card";
import { Link } from "react-router-dom";
import "./blackjack.css";
const Blackjack = () => {
  const [bettIngPage, setbetIngPage] = useState(true);
  const [timer, setTimer] = useState(10);
  const [step, setStep] = useState(1);
  const [showHand, setShowhand] = useState(false);
  const [saveCheap, setCheap] = useState();
  const [betCheap, setBet] = useState([]);
  const [balance, setBalance] = useState(2000);
  const [betValue, setBetvalue] = useState(0);
  const [fullDeck, setFullDeck] = useState([]);
  const [cardCounte, setCardCounter] = useState(3);
  const [playerCard, givePlayerCard] = useState([0, 2]);
  const [dealerCard, setDealerCard] = useState([1]);
  const [playerCardscore, setPlayerCardscore] = useState(0);
  const [dealerCardscore, setdealerCardscore] = useState(0);
  const [showBackCard, setShowBackCard] = useState(true);
  const [dealerCardDelay, setDealerCardDelay] = useState(0);
  const [checkWinner, setCheckWinner] = useState(null);
  const [stayIng, setStaying] = useState(false);
  const [resetGameDelay, setResetgameDelay] = useState(4);
  const [spliTing, setSpliting] = useState(false);
  const [splitCheck, setsplitcheck] = useState(false);
  const [splitCard, setSplitcard] = useState([2]);
  const [splitCardscore, setSplitcardScore] = useState(0);
  const [stopSliting, setStopSpliting] = useState(false);
  const [splitWinner, setSplitWinner] = useState(null);
  const [playCardSound] = useSound(CardSound);
  const [playCheapsSound] = useSound(CheapsSound);
  const [playCheapsSound2] = useSound(CheapsSound2);
  const [playSplitcardsound] = useSound(SplitcardSound);
  const [playDealerCardsound] = useSound(dealerCardsound);
  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    timer === 0 && betValue > 0 && setbetIngPage(false);
  }, [betValue, timer]);
  function displayToast(text, Icon, color, time = 1500) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: color,
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: Icon,
      title: text,
    });
  }
  function bet(e) {
    const betCheapsTable = [...betCheap];
    switch (step) {
      case 1:
        if (e.target.className === "cheaps") {
          playCheapsSound2();
          setStep(2);
          setCheap(e.target.id);
          setShowhand(false);
        }
        break;
      case 2:
        if (e.target.className === "cheaps") {
          setCheap(e.target.id);
        }
        if (e.target.title === "bet") {
          if (balance - Cheaps[parseInt(saveCheap)].value >= 0) {
            playCheapsSound();
            setShowhand(true);
            betCheapsTable.push(Cheaps[saveCheap].src);
            setBet(betCheapsTable);
            setStep(1);
            setBetvalue(betValue + Cheaps[parseInt(saveCheap)].value);
            setBalance(balance - Cheaps[parseInt(saveCheap)].value);
          } else {
            displayToast("Insufficient points", "error", "red", 5000);
            setStep(1);
          }
        }
        break;
      default:
        return setStep(1);
    }
  }
  if (timer <= 0 && betValue === 0) {
    displayToast("Please bet", "warning", "orange", 5000);
    setTimer(10);
  }
  function shuffleCard() {
    const twoDecks = [...Card];
    const deck = [];
    for (let i = 0; i < twoDecks.length; i++) {
      for (let j = 0; j < twoDecks[i].length; j++) {
        deck.push(twoDecks[i][j]);
      }
    }
    for (let i = deck.length - 1; i >= 0; i--) {
      let x = Math.floor(Math.random() * deck.length);
      [deck[i], deck[x]] = [deck[x], deck[i]];
    }
    setDealerCardDelay(0);
    setFullDeck([...deck]);
  }
  useState(() => {
    shuffleCard();
  });
  function hitCard() {
    playCardSound();
    setCardCounter(cardCounte + 1);
    const nextCard = [...playerCard];
    nextCard.push(cardCounte);
    givePlayerCard(nextCard);
  }
  const stay = () => {
    playDealerCardsound();
    setStaying(true);
    setCardCounter(cardCounte + 1);
    const dealerNextCard = [...dealerCard];
    dealerNextCard.push(cardCounte);
    setDealerCard(dealerNextCard);
    setShowBackCard(false);
    setDealerCardDelay(1);
  };
  useEffect(() => {
    let playerScore = 0;
    let dealerScore = 0;
    let splitCardscore = 0;
    fullDeck.map((e, index) =>
      playerCard.map((element) => element === index && (playerScore += e.score))
    );
    fullDeck.map((e, index) =>
      playerCard.map(
        (element) =>
          element === index &&
          playerScore > 21 &&
          e.score === 11 &&
          (playerScore -= 10)
      )
    );

    fullDeck.map((e, index) =>
      splitCard.map(
        (element) => element === index && (splitCardscore += e.score)
      )
    );
    fullDeck.map((e, index) =>
      splitCard.map(
        (element) =>
          element === index &&
          splitCardscore > 21 &&
          e.score === 11 &&
          (splitCardscore -= 10)
      )
    );

    fullDeck.map((e, index) =>
      dealerCard.map((element) => element === index && (dealerScore += e.score))
    );
    fullDeck.map((e, index) =>
      dealerCard.map(
        (element) =>
          element === index &&
          dealerScore > 21 &&
          e.score === 11 &&
          (dealerScore -= 10)
      )
    );
    fullDeck[0].score === fullDeck[2].score &&
    (splitCard.length <= 1 || playerCard.length <= 1)
      ? setsplitcheck(true)
      : setsplitcheck(false);
    setdealerCardscore(dealerScore);
    setPlayerCardscore(playerScore);
    setSplitcardScore(splitCardscore);
  }, [fullDeck, playerCard, dealerCard, splitCard, splitCheck]);
  useEffect(() => {
    dealerCardDelay > 0 &&
      setTimeout(() => setDealerCardDelay(dealerCardDelay - 1), 1000);
    dealerCardDelay === 0 && stayIng && dealerCardscore < 17 && stay();
    splitCardscore > 21 && !stopSliting && spliTingStay();
  });
  useEffect(() => {
    if (fullDeck[0].BlackJack + fullDeck[2].BlackJack === 3 && !bettIngPage) {
      setCheckWinner(2);
    } else if (playerCardscore > 21) {
      setCheckWinner(0);
    } else if (dealerCardscore > 21) {
      setCheckWinner(2);
    } else if (playerCardscore > dealerCardscore && dealerCardscore >= 17) {
      setCheckWinner(2);
    } else if (playerCardscore < dealerCardscore && dealerCardscore >= 17) {
      setCheckWinner(0);
    } else if (playerCardscore === dealerCardscore && dealerCardscore >= 17) {
      setCheckWinner(1);
    }
  }, [playerCardscore, dealerCardscore, fullDeck, bettIngPage]);
  useEffect(() => {
    if (spliTing && splitCardscore > 21) {
      setSplitWinner(0);
    } else if (spliTing && dealerCardscore > 21) {
      setSplitWinner(2);
    } else if (
      spliTing &&
      splitCardscore > dealerCardscore &&
      dealerCardscore >= 17
    ) {
      setSplitWinner(2);
    } else if (
      spliTing &&
      splitCardscore < dealerCardscore &&
      dealerCardscore >= 17
    ) {
      setSplitWinner(0);
    } else if (
      spliTing &&
      splitCardscore === dealerCardscore &&
      dealerCardscore >= 17
    ) {
      setSplitWinner(1);
    }
  }, [spliTing, splitCardscore, dealerCardscore]);
  useEffect(() => {
    const resetGame = () => {
      if (checkWinner !== null) {
        setbetIngPage(true);
        setTimer(10);
        setCheap("");
        setBet([]);
        let newBalance = 0;
        spliTing
          ? (newBalance =
              balance +
              (betValue / 2) * splitWinner +
              (betValue / 2) * checkWinner)
          : (newBalance = balance + betValue * checkWinner);
        setBalance(newBalance);
        setBetvalue(0);
        setShowhand(false);
        setCardCounter(3);
        givePlayerCard([0, 2]);
        setDealerCard([1]);
        setShowBackCard(true);
        setResetgameDelay(4);
        setStaying(false);
        setDealerCardDelay(0);
        setSpliting(false);
        setsplitcheck(false);
        setSplitcard([2]);
        setSplitcardScore(0);
        setStopSpliting(0);
        setSplitWinner(null);
        setCheckWinner(null);
        setdealerCardscore(0);
        setPlayerCardscore(0);
        shuffleCard();
      }
    };
    resetGameDelay > 0 &&
      checkWinner !== null &&
      !bettIngPage &&
      setTimeout(() => setResetgameDelay(resetGameDelay - 1), 1000);
    resetGameDelay === 0 && resetGame();
    resetGameDelay === 0 && setCheckWinner(null);
  }, [
    resetGameDelay,
    checkWinner,
    balance,
    betValue,
    bettIngPage,
    spliTing,
    splitWinner,
  ]);
  const cheapAnimation =
    checkWinner === 1 ? "Tie" : checkWinner === 2 ? "playerWin" : "dealerWin";
  const splitCardsFunct = () => {
    playSplitcardsound();
    setSpliting(true);
    const playCardafterSpliting = [...playerCard];
    playCardafterSpliting.pop();
    givePlayerCard(playCardafterSpliting);
    setCardCounter(cardCounte + 1);
    const nextCard = [...splitCard];
    nextCard.push(cardCounte);
    setSplitcard(nextCard);
  };
  const spliTingStay = () => {
    playDealerCardsound();
    setStopSpliting(true);
    setCardCounter(cardCounte + 1);
    const nextCard = [...playerCard];
    nextCard.push(cardCounte);
    givePlayerCard(nextCard);
  };
  const hitSpliting = () => {
    playCardSound();
    setCardCounter(cardCounte + 1);
    const nextCard = [...splitCard];
    nextCard.push(cardCounte);
    setSplitcard(nextCard);
  };
  const winnerText =
    !spliTing && checkWinner === 0
      ? "Dealers Wins"
      : !spliTing && checkWinner === 1
      ? "push"
      : !spliTing && checkWinner === 2
      ? "You Win"
      : spliTing && checkWinner + splitWinner <= 1
      ? "Dealers Wins"
      : spliTing && checkWinner + splitWinner === 2
      ? "push"
      : spliTing && checkWinner + splitWinner <= 4 && "You Win";
  let winBalance =
    !spliTing && checkWinner === 2 && checkWinner !== null
      ? checkWinner * betValue
      : spliTing &&
        checkWinner + splitWinner > 2 &&
        checkWinner + splitWinner * (betValue / 2);

  return (
    <div className="container__game">
      <div
        className="return-menu"
        style={{
          display:
            (betValue === 0 && balance === 0) ||
            (betValue === 0 && balance <= 2.5)
              ? "flex"
              : "none",
        }}
      >
        <div className="homeBtn">
          <Link to="/">
            <button>
              <ImHome />
            </button>
          </Link>
        </div>
      </div>
      <div
        className="blackJack__container"
        style={{ display: bettIngPage === false ? "grid" : "none" }}
      >
        <div className="dealer-container">
          <div className="dealer-cardScore">
            <div className="score">
              <span>{dealerCardscore}</span>
            </div>
          </div>
          <div className="dealer-card">
            {fullDeck.map((e, index) =>
              dealerCard.map(
                (element, elementindex) =>
                  element === index && (
                    <img
                      key={index}
                      src={e.card}
                      alt=""
                      id={index}
                      className={elementindex === 1 ? "rotate" : "dealerDealt"}
                      style={{
                        transform: "translateX(" + elementindex * -50 + "%)",
                      }}
                    />
                  )
              )
            )}
            <img
              src={backCard}
              alt=""
              className="dealerDealt2"
              style={{
                transform: "translateX(-50%)",
                display: showBackCard ? "flex" : "none",
              }}
            />
          </div>
        </div>
        <div
          className="player-container"
          style={{ display: spliTing ? "none" : "flex" }}
        >
          <div className="player-cardscore">
            <div className="score">
              <span>{playerCardscore}</span>
            </div>
          </div>
          <div className="player-card">
            {fullDeck.map((e, index) =>
              playerCard.map(
                (element, elementindex) =>
                  element === index && (
                    <img
                      key={index}
                      src={e.card}
                      alt=""
                      id={index}
                      className={index === 0 ? "playerCard1 " : "playerCard2"}
                      style={{
                        transform: "translateX(" + elementindex * -50 + "%)",
                      }}
                    />
                  )
              )
            )}
          </div>
        </div>
        <div
          className="after-spliting-player"
          style={{
            display: spliTing ? "flex" : "none",
          }}
        >
          <div
            className="fingers"
            style={{ display: !stopSliting ? "block" : "none" }}
          >
            <img src={selectHand} alt="" />
          </div>
          <div
            className="fingers2"
            style={{ display: !stopSliting || stayIng ? "none" : "block" }}
          >
            <img src={selectHand} alt="" />
          </div>
          <div className="first-playerCard">
            {fullDeck.map((e, index) =>
              playerCard.map(
                (element, elementindex) =>
                  element === index && (
                    <img
                      key={index}
                      src={e.card}
                      alt=""
                      id={index}
                      className={
                        elementindex === 0 ? "spliTcard " : "playerCard2"
                      }
                      style={{
                        transform: "translateX(" + elementindex * -50 + "%)",
                      }}
                    />
                  )
              )
            )}
            <div className="score" style={{ transform: "translateX(0)" }}>
              <span>{playerCardscore}</span>
            </div>
          </div>
          <div className="second-playercard">
            <div className="score" style={{ transform: "translateX(0)" }}>
              <span>{splitCardscore}</span>
            </div>
            {fullDeck.map((e, index) =>
              splitCard.map(
                (element, elementindex) =>
                  element === index && (
                    <img
                      key={index}
                      src={e.card}
                      alt=""
                      id={index}
                      className={
                        elementindex === 0 ? "spliTcard2 " : "playerCard2"
                      }
                      style={{
                        transform: "translateX(" + elementindex * -50 + "%)",
                      }}
                    />
                  )
              )
            )}
          </div>
        </div>
        <div className="cheaps-table-blackjack">
          <div
            className="bet-table"
            style={{ display: checkWinner === 0 ? "none" : "flex" }}
          >
            <div className="bet-position">
              {betCheap.map((e, index) => (
                <img
                  key={index}
                  src={e}
                  alt=""
                  title="bet"
                  style={{ transform: "translate(0," + index * -5 + "px)" }}
                />
              ))}
            </div>
          </div>
          <div className="bet-value-blackjack">
            <div className="bet-value">
              <span>{betValue}</span>
            </div>
          </div>
        </div>
        <div
          className="cheaps-winner"
          style={{
            display:
              (checkWinner === null || checkWinner === 1) && resetGameDelay > 2
                ? "none"
                : "flex",
          }}
        >
          <div className="give-cheaps">
            <div className="winnerCheaps-container">
              {betCheap.map((e, index) => (
                <img
                  key={index}
                  src={e}
                  alt=""
                  title="bet"
                  className={cheapAnimation}
                  style={{ transform: "translate(0," + index * -5 + "px)" }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="button-container">
          <div
            className="buttons-control"
            style={{
              display: stayIng || checkWinner !== null ? "none" : "flex",
            }}
          >
            <button
              className="hit"
              onClick={() =>
                spliTing && !stopSliting ? hitSpliting() : hitCard()
              }
              disabled={stayIng}
            >
              <HiPlusCircle />
            </button>
            <button
              className="stay"
              onClick={() =>
                spliTing && !stopSliting ? spliTingStay() : stay()
              }
            >
              <FaMinusCircle />
            </button>
            <button
              className="split"
              style={{ display: !splitCheck || spliTing ? "none" : "block" }}
              onClick={() => splitCardsFunct()}
            >
              <FaCode />
            </button>
          </div>
        </div>
        <div className="winner__container__balance">
          <div
            className="winnerCont"
            style={{
              display:
                checkWinner !== null && resetGameDelay <= 2 ? "block" : "none",
            }}
          >
            <span className="result-Text">{winnerText}</span>
            <br />
            <span
              style={{
                display:
                  (checkWinner === 2 && !spliTing) ||
                  (spliTing && checkWinner > 2)
                    ? "inline-block"
                    : "none",
              }}
            >
              {winBalance}$
            </span>
          </div>
        </div>
      </div>
      <div
        className="betting__container"
        style={{ display: bettIngPage ? "grid" : "none" }}
      >
        <div className="circl">
          <div className="circular__Progresbar">
            <CircularProgressbar
              className="circul_progres"
              value={timer * 10}
              styles={{
                path: {
                  stroke: `darkgreen`,
                  strokeLinecap: "butt",
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                trail: {
                  stroke: "rgba(255, 254, 254, 0.562)",
                  strokeLinecap: "butt",
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                background: {
                  fill: "Blue",
                },
              }}
            />
            <label>{timer}</label>
          </div>
        </div>
        <div className="Text-Beting">
          <article>
            <span className="placeBet-Text">Place Your Bets</span>
          </article>
        </div>
        <dir className="bet-cheaps-container">
          <div className="bet-cheaps">
            {Cheaps.map((e, index) => (
              <img
                key={index}
                src={e.src}
                alt=""
                id={index}
                className={"cheaps"}
                onClick={(e) => bet(e)}
              />
            ))}
          </div>
        </dir>
        <div className="bet-table">
          <div className="bet-position" title="bet" onClick={(e) => bet(e)}>
            {betCheap.map((e, index) => (
              <img
                key={index}
                src={e}
                alt=""
                title="bet"
                style={{ transform: "translate(0," + index * -5 + "px)" }}
                onClick={(e) => bet(e)}
              />
            ))}
            <img
              className="hand"
              src={hand}
              alt=""
              style={{
                display: showHand && bettIngPage ? "block" : "none",
                width: "105px",
                transform: "translate(-25%, 20%)",
              }}
            />
          </div>
        </div>
        <div className="money-container">
          <div className="balance-container">
            <dir className="balance">
              <span>Balance:{balance}$</span>
            </dir>
          </div>
          <div className="bet-container">
            <dir className="bet">
              <span>Bet:{betValue}$</span>
            </dir>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blackjack;
