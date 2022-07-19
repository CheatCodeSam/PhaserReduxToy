import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Unit, Terrain } from "./types"
import { UnitPathFinder } from "./UnitPathFinder"

interface GameState {
  unit: Unit
  grid: number[][]
  ui: { type: string }[]
}

const initialState: GameState = {
  grid: [
    [1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0]
  ],
  unit: { id: "id", movePoints: 3, x: 1, y: 0 },
  ui: []
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<[number, number]>) => {
      state.unit.x = action.payload[0]
      state.unit.y = action.payload[1]
      const pathfinder = new UnitPathFinder(3, 5, state.unit)
      pathfinder.explore()
      state.ui.push({ type: "unit_moved" })
    },
    animationDone: (state) => {
      state.ui = []
    }
  }
})

export const { animationDone, selectTile } = gameSlice.actions

export default gameSlice.reducer
