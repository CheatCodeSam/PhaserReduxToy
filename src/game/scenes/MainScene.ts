import { Scene } from "phaser"
import { animationDone } from "../features/game.slice"
import { Point, Terrain } from "../features/types"
import { AppStore, RootState } from "../store/store"
import Tile from "./Tile"
import Unit from "./Unit"

const moveUnit = async (scene: MainScene, state: RootState, type: any) => {
  const unitIndex = state.game.units.byId["id1"].coord!
  scene.unit.x = (unitIndex % state.game.mapWidth) * 32
  scene.unit.y = Math.floor(unitIndex / state.game.mapWidth) * 32
}

const highlight_tiles = async (
  scene: MainScene,
  tiles: { coord: Point; cost: number }[]
) => {
  scene.tiles.forEach((tile) => tile.forEach((t) => t.unhighlight()))
  tiles.forEach((tile) => {
    scene.tiles[tile.coord.x][tile.coord.y]?.highlight()
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

    let ungroupedTiles: Terrain[][] = []
    for (let i = 0; i < state.map.length; i += state.mapWidth) {
      ungroupedTiles.push(state.map.slice(i, i + state.mapWidth))
    }
    this.tiles = ungroupedTiles.map((c, y) =>
      c.map((c, x) => new Tile(this, c.name, x, y, x + y * state.mapWidth))
    )

    this.tiles.forEach((c) => c.map((g) => this.add.existing(g)))

    const unitIndex = state.units.byId["id1"].coord!
    this.unit = new Unit(
      this,
      1,
      unitIndex % state.mapWidth,
      Math.floor(unitIndex / state.mapWidth)
    )

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
