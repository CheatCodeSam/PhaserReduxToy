import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Unit, Terrain } from "./types"
import { UnitPathFinder } from "./UnitPathFinder"

interface GameState {
  unit: Unit
  grid: number[][]
  ui: { type: string; payload?: any }[]
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

const indexToCoord = (index: number) => {
  console.log(index)

  return [index % 5, Math.floor(index / 5)]
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
      const retCost: any[] = []
      pathfinder
        .getCosts()
        .forEach((value, key) =>
          retCost.push({ coord: indexToCoord(key), cost: value })
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
