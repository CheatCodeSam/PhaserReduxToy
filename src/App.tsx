import React, { useRef, useEffect } from "react"
import init from "./game"

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      init(canvas)
    }
  }, [])

  return <canvas ref={canvasRef} />
}
export default App
