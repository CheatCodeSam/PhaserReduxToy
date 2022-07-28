import Phaser from "phaser"
import { selectTile } from "../features/game.slice"
import { createPoint as p, Point } from "../features/types"
import { MainScene } from "./MainScene"

class Tile extends Phaser.GameObjects.Container {
  color: number
  terrain: number
  rect: Phaser.GameObjects.Rectangle

  constructor(
    scene: MainScene,
    color: string,
    x: number,
    y: number,
    public id: number
  ) {
    super(scene, 0)
    let num = 0
    if (color === "ground") num = 0
    else if (color === "water") num = 1
    else if (color === "mountain") num = 2
    this.terrain = num === 0 ? 0xff0000 : 0x000ff
    if (num === 2) this.terrain = 0x00ff00
    this.x = x * 32
    this.y = y * 32
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
      scene.store.dispatch(selectTile(this.id))
    })
  }

  highlight() {
    this.rect.setFillStyle(this.terrain, 0.2)
  }

  unhighlight() {
    this.rect.setFillStyle(this.terrain)
  }

  update() {}
}

export default Tile
