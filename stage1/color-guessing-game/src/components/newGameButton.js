import "../styles/newGameButton.css"

export default function NewGameButton({ onClick }) {
  return (
    <button data-testid="newGameButton" onClick={onClick} className="new-game-button">
      New Game
    </button>
  )
}

