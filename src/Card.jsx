import React from "react";
import "./styles.css";

export default function Card( {card, handleChoice, flipped, disabled}) {
    const handleClick = () => {
        if(!disabled) {
            handleChoice(card);
        }
    };
   
    return (
        <div className="card" onClick={handleClick}>
            <div className={`card-inner ${flipped ? "flipped" : ""}`}>
                <div className="card-back">{card.emoji}</div>
                <div className="card-front">❔</div>
            </div>
        </div>
    );
}