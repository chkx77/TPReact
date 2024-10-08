import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [guess, setGuess] = useState('');
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 20) + 1);
  const [score, setScore] = useState(0); // Puntuación acumulativa
  const [attempts, setAttempts] = useState(10); // Intentos o corazones
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false); // Para modo difícil

  const loseHeartSound = new Audio('/pum.mp3');
  const gameOverSound = new Audio('/over.mp3');
  const victorySound = new Audio('/victory.mp3');

  loseHeartSound.preload = 'auto';
  gameOverSound.preload = 'auto';
  victorySound.preload = 'auto';

  const inputRef = useRef(null); 

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !gameWon) {
      const speed = isHardMode ? 70 : 100; 
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), speed);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !gameOver && !gameWon) {
      setGameOver(true);
      setMessage('');
      gameOverSound.play();
      if (score > highScore) {
        setHighScore(score); // Actualizar puntuación máxima
      }
      setScore(0); // Reiniciar puntuación acumulada
    }
  }, [timeLeft, gameOver, gameWon, isHardMode, score, highScore]);

  useEffect(() => {
    if (attempts <= 5) {
      setIsHardMode(true);
    } else {
      setIsHardMode(false);
    }
  }, [attempts]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [guess, gameOver, gameWon]);

  const handleGuess = () => {
    if (timeLeft === 0 || gameOver || gameWon) return;

    const guessNumber = parseInt(guess);

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 20) {
      setMessage('Solo de 1 a 20');
      setGuess(''); 
      return;
    } else {
      setMessage('');
    }

    if (attempts > 0) {
      if (guessNumber === targetNumber) {
        setMessage('');
        const points = attempts; 
        setScore((prev) => prev + points);
        setGameWon(true);
        victorySound.play();
      } else if (guessNumber > targetNumber) {
        setMessage('Más bajo');
        setAttempts((prev) => Math.max(prev - 1, 0));
        loseHeartSound.play();
      } else {
        setMessage('Más alto');
        setAttempts((prev) => Math.max(prev - 1, 0));
        loseHeartSound.play();
      }

      setTimeLeft(100); 
      setGuess('');

      if (attempts === 1 || attempts === 0) {
        setMessage('');
        setGameOver(true);
        gameOverSound.play();
        if (score > highScore) {
          setHighScore(score); // Actualizar puntuación máxima
        }
        setScore(0); // Reiniciar puntuación acumulada
      }
    } else {
      setMessage('');
      setGameOver(true);
      gameOverSound.play();
      if (score > highScore) {
        setHighScore(score); // Actualizar puntuación máxima
      }
      setScore(0); // Reiniciar puntuación acumulada
    }
  };

  const handleReset = () => {
    gameOverSound.pause();
    gameOverSound.currentTime = 0;

    setTargetNumber(Math.floor(Math.random() * 20) + 1);
    setAttempts(10); 
    setMessage('');
    setGuess('');
    setTimeLeft(100);
    setGameOver(false);
    setGameWon(false);

    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };

  return (
    <div className="app-container">
      <div className="container mt-5 text-center game-wrapper">
        <div className="content-container">
          {gameOver || gameWon ? (
            <div className="game-over">
              <h1 className="text-danger game-over-title">
                {gameWon ? '¡GANASTE!' : 'GAME OVER'}
              </h1>
              <button className="btn btn-reset btn-lg mt-3" onClick={handleReset}>
                Reintentar
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-title styled-title">Adiviná el Número</h1>
              {isHardMode && (
                <div className="hard-mode">
                  <h2 className="hard-mode-text animate-text">MODO DIFÍCIL</h2>
                </div>
              )}
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card p-4 border-light shadow-lg bg-card text-white game-panel">
                    <div className="hearts-container">
                      {Array.from({ length: 10 }, (_, i) => (
                        <img
                          key={i}
                          src="/corazon.png"
                          alt="Heart Icon"
                          className={`heart-icon ${i >= 10 - attempts ? '' : 'grayed-out'}`}
                        />
                      ))}
                    </div>
                    <p className={`alert ${attempts > 0 ? 'alert-info' : 'alert-danger'}`}>{message}</p>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control form-control-lg border-info text-dark circular-input"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder="?"
                        min="1"
                        max="20"
                        step="1"
                        ref={inputRef} 
                      />
                    </div>
                    <div className="time-bar mt-3">
                      <div className="time-bar-fill" style={{ width: `${timeLeft}%` }}></div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <button className="btn btn-action btn-lg" onClick={handleGuess}>
                        Adivinar
                      </button>
                      <button className="btn btn-reset btn-lg" onClick={handleReset}>
                        Reiniciar
                      </button>
                    </div>
                    <p className="lead text-center mt-4 small-text">
                      Puntaje Máximo: <span className="badge rounded-pill bg-highscore">{highScore}</span>
                    </p>
                    <p className="lead text-center mt-4 small-text">
                      Puntuación Actual: <span className="badge rounded-pill bg-highscore">{score}</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
