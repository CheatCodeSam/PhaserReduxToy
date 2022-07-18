import { Scene } from "phaser"
import { animationDone } from "../features/game.slice"
import { AppStore, RootState } from "../store/store"
import Tile from "./Tile"
import Unit from "./Unit"

const moveUnit = async (scene: MainScene, state: RootState, type: any) => {
  scene.unit.x = state.game.unit.x * 32
  scene.unit.y = state.game.unit.y * 32
}

export class MainScene extends Scene {
  tiles!: Tile[][]
  unit!: Unit
  constructor(public store: AppStore) {
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

    const state = this.store.getState().game

    this.tiles = state.grid.map((c, y) =>
      c.map((c, x) => new Tile(this, c, x, y, x - 1))
    )

    this.tiles.forEach((c) => c.map((g) => this.add.existing(g)))

    this.unit = new Unit(this, 1, 0, 0)

    this.add.existing(this.unit)

    this.store.subscribe(() => this.stateUpdated())
  }

  stateUpdated() {
    const newState = this.store.getState()
    if (!newState.game.ui.length) return
    console.log(newState.game.ui.length)

    for (const action of newState.game.ui) {
      moveUnit(this, newState, action)
    }

    this.store.dispatch(animationDone())
  }

  update(time: number, delta: number): void {
    this.children.each((c) => c.update())
  }
}
