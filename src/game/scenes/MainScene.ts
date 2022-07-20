import { Scene } from "phaser"
import { animationDone } from "../features/game.slice"
import { AppStore, RootState } from "../store/store"
import Tile from "./Tile"
import Unit from "./Unit"

const moveUnit = async (scene: MainScene, state: RootState, type: any) => {
  scene.unit.x = state.game.unit.x * 32
  scene.unit.y = state.game.unit.y * 32
}

const highlight_tiles = async (
  scene: MainScene,
  tiles: { coord: [number, number]; cost: number }[]
) => {
  scene.tiles.forEach((tile) => tile.forEach((t) => t.unhighlight()))
  tiles.forEach((tile) => {
    const tileX = tile.coord[1]
    const tileY = tile.coord[0]
    console.log(tile)
    scene.tiles[tileX][tileY]?.highlight()
  })
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

    console.log("size", this.tiles.length, this.tiles[0].length)

    this.tiles.forEach((c) => c.map((g) => this.add.existing(g)))

    this.unit = new Unit(this, 1, 0, 0)

    this.add.existing(this.unit)

    this.store.subscribe(() => this.stateUpdated())
  }

  stateUpdated() {
    const newState = this.store.getState()
    if (!newState.game.ui.length) return

    for (const action of newState.game.ui) {
      if (action.type === "unit_moved") moveUnit(this, newState, action)
      else if (action.type === "highlight_tiles") {
        highlight_tiles(this, action.payload)
      }
    }

    this.store.dispatch(animationDone())
  }

  update(time: number, delta: number): void {
    this.children.each((c) => c.update())
  }
}
