import "./ColorOptions.css"

export default function ColorOptions({ options, onGuess, isGuessing }) {
  return (
    <div className="color-options">
      {options.map((color, index) => (
        <button
          key={index}
          data-testid="colorOption"
          className={`color-option ${isGuessing ? "disabled" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onGuess(color)}
          disabled={isGuessing}
        />
      ))}
    </div>
  )
}

