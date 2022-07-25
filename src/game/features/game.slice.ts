import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Unit, AWMap, createPoint as p, Point, Terrain } from "./types"
import { UnitPathFinder } from "./UnitPathFinder"

const t = (terrainID: number): Terrain => {
  const terrain = ["ground", "water", "mountain"][terrainID]
  return { name: terrain, unit: null }
}

const myUnit: Unit = { id: "id", movePoints: 3, coord: p(0, 3) }

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
    [
      { name: "ground", unit: myUnit },
      t(1),
      t(0),
      t(0),
      t(0),
      t(0),
      t(0),
      t(0),
      t(0),
      t(0)
    ],
    [t(0), t(0), t(0), t(2), t(0), t(1), t(1), t(1), t(0), t(0)],
    [t(1), t(1), t(1), t(0), t(0), t(1), t(1), t(1), t(0), t(0)],
    [t(0), t(1), t(0), t(0), t(1), t(1), t(1), t(1), t(0), t(0)],
    [t(0), t(0), t(0), t(0), t(0), t(1), t(1), t(1), t(2), t(0)],
    [t(0), t(1), t(0), t(0), t(1), t(1), t(1), t(1), t(2), t(0)],
    [t(0), t(0), t(2), t(0), t(0), t(1), t(1), t(1), t(0), t(1)]
  ],
  selectedUnit: null,
  unit: myUnit,
  ui: []
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<Point>) => {
      if (state.grid[action.payload.y][action.payload.x].unit) {
        const unitInTile = state.grid[action.payload.y][action.payload.x].unit!
        state.selectedUnit = unitInTile
        const pathfinder = new UnitPathFinder(state.grid, unitInTile)
        pathfinder.explore()

        const retCost = pathfinder.getAvailablePoints().map((value) => {
          return { coord: value }
        })
        state.ui.push({ type: "highlight_tiles", payload: retCost })
      } else {
        if (state.selectedUnit) {
          const pathfinder = new UnitPathFinder(state.grid, state.unit)
          pathfinder.explore()
          const isAvailable = pathfinder.getAvailablePoints().find((val) => {
            console.log(val)
            console.log(action.payload)
            return val.x === action.payload.y && val.y === action.payload.x
          })
          console.log(isAvailable)

          if (isAvailable) {
            state.grid[state.selectedUnit.coord.y][
              state.selectedUnit.coord.x
            ].unit = null
            state.grid[action.payload.y][action.payload.x].unit = state.unit
            state.unit.coord.x = action.payload.x
            state.unit.coord.y = action.payload.y
            state.ui.push({ type: "unit_moved" })
          }
        }
        state.selectedUnit = null
        state.ui.push({ type: "highlight_tiles", payload: [] })
      }
      // state.grid[state.unit.coord.y][state.unit.coord.x].unit = null
      // state.grid[action.payload.y][action.payload.x].unit = state.unit
      // state.unit.coord = action.payload
      // state.selectedUnit = state.unit
      // const pathfinder = new UnitPathFinder(state.grid, state.unit)
      // pathfinder.explore()
      // const retCost: any[] = []
      // pathfinder
      //   .getAvailablePoints()
      //   .forEach((value) => retCost.push({ coord: value }))
      // state.ui.push({ type: "unit_moved" })
      // state.ui.push({ type: "highlight_tiles", payload: retCost })
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
