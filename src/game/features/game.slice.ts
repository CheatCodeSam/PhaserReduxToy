import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Unit, AWMap, createPoint as p, Point, Terrain } from "./types"
import { UnitPathFinder } from "./UnitPathFinder"

const t = (terrainID: number): Terrain => {
  const terrain = ["ground", "water", "mountain"][terrainID]
  return { name: terrain, unit: null }
}

interface GameState {
  unit: Unit
  selectedUnit: Unit | null
  grid: AWMap
  ui: { type: string; payload?: any }[]
}

const initialState: GameState = {
  grid: [
    [t(1), t(1), t(1), t(0), t(0), t(1), t(1), t(1), t(0), t(0)],
    [t(0), t(1), t(0), t(0), t(1), t(1), t(1), t(1), t(0), t(0)],
    [t(0), t(0), t(0), t(0), t(0), t(1), t(1), t(1), t(0), t(0)],
    [t(0), t(1), t(0), t(0), t(0), t(0), t(0), t(0), t(0), t(0)],
    [t(0), t(0), t(0), t(2), t(0), t(1), t(1), t(1), t(0), t(0)],
    [t(1), t(1), t(1), t(0), t(0), t(1), t(1), t(1), t(0), t(0)],
    [t(0), t(1), t(0), t(0), t(1), t(1), t(1), t(1), t(0), t(0)],
    [t(0), t(0), t(0), t(0), t(0), t(1), t(1), t(1), t(2), t(0)],
    [t(0), t(1), t(0), t(0), t(1), t(1), t(1), t(1), t(2), t(0)],
    [t(0), t(0), t(2), t(0), t(0), t(1), t(1), t(1), t(0), t(1)]
  ],
  selectedUnit: null,
  unit: { id: "id", movePoints: 3, coord: p(0, 3) },
  ui: []
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<Point>) => {
      state.unit.coord = action.payload
      state.selectedUnit = state.unit
      const pathfinder = new UnitPathFinder(state.grid, state.unit)
      pathfinder.explore()
      const retCost: any[] = []
      pathfinder
        .getAvailablePoints()
        .forEach((value) => retCost.push({ coord: value }))
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
