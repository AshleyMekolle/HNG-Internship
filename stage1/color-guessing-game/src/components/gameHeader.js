import "../styles/gameHeader.css"

export default function GameHeader({ score, streak }) {
  return (
    <div className="game-header">
      <h1>Color Guessing Game</h1>
      <h3>Guess the correct color displayed in the box below! </h3>
      <div className="stats">
        <div className="stat-item">
          <div className="stat-label">Score</div>
          <div className="stat-value" data-testid="score">
            {score}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Streak</div>
          <div className="stat-value">{streak}</div>
        </div>
      </div>
      {streak >= 3 && <div className="streak-indicator"> {streak}x 🔥 Hot Streak!</div>}
    </div>
  )
}

