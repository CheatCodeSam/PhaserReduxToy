import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Unit, createPoint as p, Point, Terrain } from "./types"
import { UnitPathFinder } from "./UnitPathFinder"
import { generateMap } from "./helpers"

interface NormalizedObjects<T> {
  byId: { [id: string]: T }
  allIds: string[]
}

interface GameState {
  units: NormalizedObjects<Unit>
  mapWidth: number
  map: Terrain[]
  selectedUnit: string | null
  ui: { type: string; payload?: any }[]
}

const generatedMap = generateMap()

const initialState: GameState = {
  map: generatedMap.map,
  mapWidth: generatedMap.width,
  units: {
    byId: {
      id1: {
        id: "id1",
        movePoints: 3,
        coord: 4
      }
    },
    allIds: ["id1"]
  },
  selectedUnit: null,
  ui: []
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<number>) => {
      const unit = state.units.byId["id1"]
      state.map[unit.coord].unitId = null
      state.units.byId["id1"].coord = action.payload
      state.map[unit.coord].unitId = "id1"

      const ungroupedTiles: Terrain[][] = []
      for (let i = 0; i < state.map.length; i += state.mapWidth) {
        ungroupedTiles.push(state.map.slice(i, i + state.mapWidth))
      }

      const pathfinder = new UnitPathFinder(ungroupedTiles, unit)
      pathfinder.explore()

      const retCost: number[] = []
      pathfinder.getAvailablePoints().forEach((value, key) => retCost.push(key))

      state.ui.push({ type: "unit_moved" })
      state.ui.push({ type: "highlight_tiles", payload: retCost })
    },
    unselectUnit: (state) => {
      state.selectedUnit = null
    },
    animationDone: (state) => {
      state.ui = []
    }
  }
})

export const { animationDone, selectTile, unselectUnit } = gameSlice.actions

export default gameSlice.reducer
