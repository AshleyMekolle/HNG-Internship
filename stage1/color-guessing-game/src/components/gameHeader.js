import "../styles/gameHeader.css"

export default function GameHeader({ score, highScore, streak }) {
  return (
    <div className="game-header">
      <h1>Color Guessing Game</h1>
      <h3>Guess the correct color displayed in the box below!</h3>
      <div className="stats">
        <div className="stat-item">
          <div className="stat-label">Score</div>
          <div className="stat-value" data-testid="score">
            {score}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">High Score</div>
          <div className="stat-value">{highScore}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Streak</div>
          <div className="stat-value">{streak}</div>
        </div>
      </div>
    </div>
  )
}

