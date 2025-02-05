import { useState, useEffect, useCallback } from "react"
import "./App.css"

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
  "#E74C3C",
  "#2ECC71",
  "#F1C40F",
  "#1ABC9C",
  "#FF9F43",
  "#5F27CD",
  "#01A3A4",
  "#FF6B81",
]

const generateRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

const generateColorOptions = (correctColor) => {
  const options = [correctColor]
  while (options.length < 6) {
    const newColor = generateRandomColor()
    if (!options.includes(newColor)) {
      options.push(newColor)
    }
  }
  return options.sort(() => Math.random() - 0.5)
}

const ColorBox = ({ color }) => (
  <div data-testid="colorBox" className="color-box" style={{ backgroundColor: color }}></div>
)

const ColorOptions = ({ options, onGuess, isGuessing }) => (
  <div className="color-grid">
    {options.map((color, index) => (
      <button
        key={index}
        data-testid="colorOption"
        className="color-button"
        style={{ backgroundColor: color }}
        onClick={() => onGuess(color)}
        disabled={isGuessing}
      />
    ))}
  </div>
)

const GameHeader = ({ score, highScore, streak }) => (
  <div className="game-header">
    <h1>Color Guessing Game</h1>
    <div className="stats">
      <div className="stat-item">
        <span>Score</span>
        <span className="stat-value" data-testid="score">
          {score}
        </span>
      </div>
      <div className="stat-item">
        <span>High Score</span>
        <span className="stat-value">{highScore}</span>
      </div>
      <div className="stat-item">
        <span>Streak</span>
        <span className="stat-value">{streak}</span>
      </div>
    </div>
  </div>
)

const GameStatus = ({ status }) => (
  <p data-testid="gameStatus" className="game-status">
    {status}
  </p>
)

const NewGameButton = ({ onClick }) => (
  <button data-testid="newGameButton" className="new-game-button" onClick={onClick}>
    New Game
  </button>
)

const GameInstructions = () => (
  <p data-testid="gameInstructions" className="game-instructions">
    Guess the correct color! displayed in the box below.
  </p>
)

export default function ColorGuessingGame() {
  const [targetColor, setTargetColor] = useState("")
  const [colorOptions, setColorOptions] = useState([])
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState("")
  const [isGuessing, setIsGuessing] = useState(false)
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const startNewGame = useCallback((isManualReset = false) => {
    setIsGuessing(false)
    const newTargetColor = generateRandomColor()
    setTargetColor(newTargetColor)
    setColorOptions(generateColorOptions(newTargetColor))
    if (!isManualReset) {
      setGameStatus("")
    }
  }, [])

  const handleNewGame = () => {
    setScore(0)
    setStreak(0)
    startNewGame(true)
  }

  const handleWrongGuess = () => {
    setStreak(0)
    setGameStatus("Wrong guess! Try again! 🔄")
    setTimeout(() => startNewGame(), 1000)
  }

  const handleGuess = (color) => {
    if (isGuessing) return
    setIsGuessing(true)

    if (color === targetColor) {
      const newScore = score + 1
      setScore(newScore)
      setStreak((prev) => prev + 1)
      setHighScore((prev) => Math.max(prev, newScore))
      setGameStatus(`Correct! +1 point! 🎉`)
      setTimeout(() => startNewGame(), 1500)
    } else {
      handleWrongGuess()
    }
  }

  useEffect(() => {
    startNewGame()
  }, [startNewGame])

  return (
    <div className="game-container">
      <div className="game-content">
        <GameHeader score={score} highScore={highScore} streak={streak} />
        <GameInstructions />
        <ColorBox color={targetColor} />
        <ColorOptions options={colorOptions} onGuess={handleGuess} isGuessing={isGuessing} />
        <GameStatus status={gameStatus} />
        <NewGameButton onClick={handleNewGame} />
      </div>
    </div>
  )
}

