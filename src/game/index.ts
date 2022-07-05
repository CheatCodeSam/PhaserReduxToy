import Phaser from "phaser"
import { MainScene } from "./scenes"
import { store } from "./store/store"

const scene = new MainScene(store)

const initialize = (canvas: HTMLCanvasElement) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: "#125555",
    physics: {
      default: "arcade",
      arcade: {
        debug: true
      }
    },
    width: 800,
    height: 600,
    canvas: canvas,
    scene: [scene]
  }

  return new Phaser.Game(config)
}

export default initialize
