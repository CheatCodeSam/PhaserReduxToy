import Phaser from "phaser"
import { MainScene } from "./MainScene"

class Unit extends Phaser.GameObjects.Container {
  constructor(scene: MainScene, color: number, x: number, y: number) {
    super(scene, 1)
    this.x = x * 32
    this.y = y * 32
    const sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, "mummy")

    sprite.setDisplayOrigin(0, 0)
    this.add([sprite])
  }

  update() {}
}

export default Unit
