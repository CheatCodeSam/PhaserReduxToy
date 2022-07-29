import { Terrain } from "./types"

const t = (terrainID: number): Terrain => {
  const terrain = ["ground", "water", "mountain"][terrainID]
  return { name: terrain, unitId: null }
}

const map = [
  [t(1), t(1), t(1), t(0), t(0), t(1), t(1), t(1), t(0), t(0)],
  [t(0), t(1), t(0), t(0), t(1), t(1), t(1), t(1), t(0), t(0)],
  [t(0), t(0), t(0), t(0), t(0), t(1), t(1), t(1), t(0), t(0)],
  [t(0), t(1), t(0), t(0), t(0), t(0), t(0), t(0), t(0), t(0)],
  [t(0), t(0), t(0), t(2), t(0), t(0), t(1), t(1), t(0), t(0)],
  [t(1), t(1), t(1), t(0), t(0), t(1), t(1), t(1), t(0), t(0)],
  [t(0), t(1), t(0), t(0), t(1), t(1), t(1), t(1), t(0), t(0)],
  [t(0), t(0), t(0), t(0), t(0), t(1), t(1), t(1), t(2), t(0)],
  [t(0), t(1), t(0), t(0), t(1), t(1), t(1), t(1), t(2), t(0)],
  [t(0), t(0), t(2), t(0), t(0), t(1), t(1), t(1), t(0), t(1)]
]

export const generateMap = (): { map: Terrain[]; width: number } => {
  return { map: map.flat(), width: map[0].length }
}
