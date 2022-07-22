import Phaser from "phaser"
import { selectTile } from "../features/game.slice"
import { createPoint as p, Point } from "../features/types"
import { MainScene } from "./MainScene"

class Tile extends Phaser.GameObjects.Container {
  color: number
  coordinate: Point
  terrain: number
  rect: Phaser.GameObjects.Rectangle

  constructor(
    scene: MainScene,
    color: number,
    x: number,
    y: number,
    private id: number
  ) {
    super(scene, 0)
    this.terrain = color === 0 ? 0xff0000 : 0x000ff
    this.x = x * 32
    this.y = y * 32
    this.coordinate = p(x, y)
    this.color = this.terrain
    this.rect = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      0,
      32,
      32,
      this.color
    )
    this.rect.setDisplayOrigin(0, 0)
    this.add([this.rect])
    this.setSize(32, 32)

    this.setInteractive(
      new Phaser.Geom.Rectangle(16, 16, 32, 32),
      Phaser.Geom.Rectangle.Contains
    )
    this.on("pointerdown", () => {
      scene.store.dispatch(selectTile(this.coordinate))
    })
  }

  highlight() {
    this.rect.setFillStyle(0xffffff)
  }

  unhighlight() {
    this.rect.setFillStyle(this.terrain)
  }

  update() {}
}

export default Tile
