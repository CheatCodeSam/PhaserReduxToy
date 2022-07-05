import Phaser from "phaser"
import { MainScene } from "./MainScene"

class Tile extends Phaser.GameObjects.Container {
  color: number

  constructor(scene: MainScene, color: number, x: number, y: number) {
    super(scene, 0)
    this.x = x
    this.y = y
    this.color = color === 0 ? 0xff0000 : 0x000ff
    const rect = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      0,
      32,
      32,
      this.color
    )
    rect.setDisplayOrigin(0, 0)
    this.add([rect])
  }

  update() {}
}

export default Tile
