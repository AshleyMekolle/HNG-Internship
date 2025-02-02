import "../styles/gameStatus.css"

export default function GameStatus({ status }) {
  return (
    <p data-testid="gameStatus" className={`game-status ${status.includes("Correct") ? "correct" : "wrong"}`}>
      {status}
    </p>
  )
}

