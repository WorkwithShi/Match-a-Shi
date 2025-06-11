import React from "react";
import "./styles.css";

export default function Won({onRestart}) {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>🎉 You Won! 🎉</h2>
                <p>Great job, Match Master</p>
                <button onClick={onRestart}>🔁 Play Again</button>
            </div>
        </div>
    );
}