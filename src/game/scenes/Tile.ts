import Phaser from "phaser"
import { moveUnit } from "../features/game.slice"
import { MainScene } from "./MainScene"

class Tile extends Phaser.GameObjects.Container {
  color: number
  coordinate: [number, number]

  constructor(
    scene: MainScene,
    color: number,
    x: number,
    y: number,
    private id: number
  ) {
    super(scene, 0)
    this.x = x * 32
    this.y = y * 32
    this.coordinate = [x, y]
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
    this.setSize(32, 32)

    this.setInteractive(
      new Phaser.Geom.Rectangle(16, 16, 32, 32),
      Phaser.Geom.Rectangle.Contains
    )
    this.on("pointerdown", () => {
      scene.store.dispatch(moveUnit(this.coordinate))
    })
  }

  update() {}
}

export default Tile
