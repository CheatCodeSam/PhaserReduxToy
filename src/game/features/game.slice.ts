import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GameState {
  unit: number
  grid: number[]
}

const initialState: GameState = {
  grid: [0, 1, 1],
  unit: 0
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveUnit: (state, action: PayloadAction<number>) => {
      state.unit = action.payload
    }
  }
})

export const { moveUnit } = gameSlice.actions

export default gameSlice.reducer
