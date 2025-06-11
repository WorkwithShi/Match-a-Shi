import { useEffect, useState } from 'react';
import './styles.css';
import Card from './Card';
import { cardsData } from './data';
import Won from './Won';

function App() {

  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  //Shuffling and new game
  const shuffleCards = () => {
    const shuffled = [...cardsData, ...cardsData]
    .map((card, index) => ({...card, uniqueId: `${card.emoji}-${index}`}))
    .sort(() => Math.random()-0.5);
    setCards(shuffled);
    setFirstChoice(null);
    setSecondChoice(null);
    setMoves(0);
    setGameWon(false);
  };

  //When a card is clicked

  const handleChoice = (card) => {
    playSound('flip');
    if (firstChoice && card.uniqueId === firstChoice.uniqueId) return;
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  //Comparision
useEffect(() => {
  if(firstChoice && secondChoice) {
    setDisabled(true);
    setMoves(prev => prev+1);
    if (firstChoice.emoji === secondChoice.emoji) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.uniqueId === firstChoice.uniqueId || card.uniqueId === secondChoice.uniqueId
            ? { ...card, matched: true }
            : card
        )
      );
      resetTurn();
    }
    else {
      setTimeout(() => resetTurn(), 1000);
    }
  }
}, [firstChoice, secondChoice]);

//Reset choices
const resetTurn = () => {
  setFirstChoice(null);
  setSecondChoice(null);
  setDisabled(false);
};

//Completion
useEffect(() => {
  if (cards.length > 0 && cards.every(card => card.matched)) {
    playSound('win');
    setGameWon(true);
  }
},[cards]);

//Start game on first load

useEffect(() => {
  shuffleCards();
}, []);

const playSound = (name) => {
  const audio = new Audio(`/sounds/${name}.mp3`);
  audio.play();
};

  return (
    <div className="App">
      <h1>Match'a'Shi</h1>
      <p>Moves: {moves}</p>
      <button onClick={shuffleCards}>🔄 New Game</button>

      <div className="card-grid">
        {cards.map((card)=> (
        <Card
          key={card.uniqueId}
          card={card}
        handleChoice={handleChoice}
        flipped={card.uniqueId === firstChoice?.uniqueId || card.uniqueId === secondChoice?.uniqueId || card.matched}
        disabled={disabled}
        />
        ))}
      </div>
      {gameWon && <Won onRestart={shuffleCards}/>}
    </div>
  );
}

export default App;