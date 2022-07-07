import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GameState {
  unit: [number, number]
  grid: number[][]
  ui: { type: string }[]
}

const initialState: GameState = {
  grid: [
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  unit: [0, 1],
  ui: []
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveUnit: (state, action: PayloadAction<[number, number]>) => {
      state.unit = action.payload
      state.ui.push({ type: "unit_moved" })
    },
    animationDone: (state) => {
      state.ui = []
    }
  }
})

export const { moveUnit, animationDone } = gameSlice.actions

export default gameSlice.reducer
