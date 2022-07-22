import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Unit, AWMap, createPoint as p, Point } from "./types"
import { UnitPathFinder } from "./UnitPathFinder"

interface GameState {
  unit: Unit
  grid: AWMap
  ui: { type: string; payload?: any }[]
}

const initialState: GameState = {
  grid: [
    [1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 2, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 2, 0],
    [0, 0, 2, 0, 0, 1, 1, 1, 0, 0]
  ],
  unit: { id: "id", movePoints: 3, coord: p(1, 0) },
  ui: []
}

const indexToCoord = (map: AWMap, index: number) => {
  const width = map[0].length
  return p(Math.floor(index / width), index % width)
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<Point>) => {
      state.unit.coord = action.payload
      const pathfinder = new UnitPathFinder(state.grid, state.unit)
      pathfinder.explore()
      const retCost: any[] = []
      pathfinder
        .getCosts()
        .forEach((value, key) =>
          retCost.push({ coord: indexToCoord(state.grid, key), cost: value })
        )
      state.ui.push({ type: "unit_moved" })
      state.ui.push({ type: "highlight_tiles", payload: retCost })
    },
    animationDone: (state) => {
      state.ui = []
    }
  }
})

export const { animationDone, selectTile } = gameSlice.actions

export default gameSlice.reducer
