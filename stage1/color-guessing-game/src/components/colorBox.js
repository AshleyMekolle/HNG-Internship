import "../styles/colorBox.css"

export default function ColorBox({ color }) {
  return (
    <div data-testid="colorBox" className="color-box" style={{ backgroundColor: color }}>
    </div>
  )
}

