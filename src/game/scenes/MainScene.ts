import { Scene } from "phaser"
import { AppStore, RootState } from "../store/store"
import Tile from "./Tile"
import Unit from "./Unit"

const moveUnit = async (scene: MainScene, state: RootState, type: any) => {
  scene.unit.x = (state.game.unit + 1) * 32
}

export class MainScene extends Scene {
  tiles!: Tile[]
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

    this.tiles = state.grid.map((c, i) => new Tile(this, c, i * 32, 0, i - 1))

    this.tiles.forEach((c) => this.add.existing(c))

    this.unit = new Unit(this, 1, 0, 0)

    this.add.existing(this.unit)

    this.store.subscribe(() => this.stateUpdated())
  }

  stateUpdated() {
    const newState = this.store.getState()

    if (!newState.game.ui.length) return
    // Trigger UIActions, then empty the actions array
    for (const action of newState.game.ui) {
      moveUnit(this, newState, action)
    }
    // this.store.dispatch(animationsDone())
  }

  update(time: number, delta: number): void {}
}
