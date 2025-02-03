import { useState, useEffect } from "react"
import ColorBox from "./components/colorBox"
import ColorOptions from "./components/colorOptions"
import GameHeader from "./components/gameHeader"
import GameStatus from "./components/gameStatus"
import NewGameButton from "./components/newGameButton"
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

export default function ColorGuessingGame() {
  const [targetColor, setTargetColor] = useState("")
  const [colorOptions, setColorOptions] = useState([])
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState("")
  const [isGuessing, setIsGuessing] = useState(false)
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(0)

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
      setGameStatus(`Correct! +1 point! 🎉 High Score: ${Math.max(highScore, newScore)}`)
      setTimeout(() => startNewGame(), 1500)
    } else {
      handleWrongGuess()
    }
  }

  const startNewGame = (isManualReset = false) => {
    setIsGuessing(false)
    const newTargetColor = generateRandomColor()
    setTargetColor(newTargetColor)
    setColorOptions(generateColorOptions(newTargetColor))
    if (!isManualReset) {
      setGameStatus("")
    }
  }

  useEffect(() => {
    startNewGame()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="game-container">
      <div className="game-content">
        <GameHeader score={score} highScore={highScore} streak={streak} />
        <ColorBox color={targetColor} />
        <ColorOptions options={colorOptions} onGuess={handleGuess} isGuessing={isGuessing} />
        <GameStatus status={gameStatus} />
        <NewGameButton onClick={handleNewGame} />
      </div>
    </div>
  )
}

