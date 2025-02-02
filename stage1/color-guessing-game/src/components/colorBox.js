import "./ColorBox.css"

export default function ColorBox({ color }) {
  return (
    <div data-testid="colorBox" className="color-box" style={{ backgroundColor: color }}>
      <div className="color-box-overlay">Click matching color below!</div>
    </div>
  )
}

