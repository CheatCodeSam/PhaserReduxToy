import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Unit, Terrain } from "./types"

interface GameState {
  unit: Unit
  grid: number[][]
  ui: { type: string }[]
}

const initialState: GameState = {
  grid: [
    [1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  unit: { movePoints: 3, x: 1, y: 0 },
  ui: []
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveUnit: (state, action: PayloadAction<[number, number]>) => {
      state.unit.x = action.payload[0]
      state.unit.y = action.payload[1]
      state.ui.push({ type: "unit_moved" })
    },
    selectTile: (state, action: PayloadAction<[number, number]>) => {},
    animationDone: (state) => {
      state.ui = []
    }
  }
})

export const { moveUnit, animationDone } = gameSlice.actions

export default gameSlice.reducer
