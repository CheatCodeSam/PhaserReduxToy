import { Scene } from "phaser"
import { AppStore } from "../store/store"
import Tile from "./Tile"

export class MainScene extends Scene {
  block!: Phaser.GameObjects.Image
  text!: Phaser.GameObjects.Text
  tiles!: Tile[]
  constructor(private store: AppStore) {
    super("main")
  }
  preload(): void {
    this.load.image("block", "block.webp")
    this.load.spritesheet("mummy", "miniwalk.png", {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create(): void {
    this.input.setPollAlways()

    this.add.existing(new Tile(this, 0, 32, 0))
    const state = this.store.getState().game
    console.log(state)

    this.tiles = state.grid.map((c, i) => new Tile(this, c, i * 32, 0))

    this.tiles.forEach((c) => this.add.existing(c))

    this.store.subscribe(() => this.stateUpdated())
  }

  stateUpdated() {
    const newState = this.store.getState()
  }

  update(time: number, delta: number): void {}
}
