export interface Unit {
  id: string
  movePoints: number
  x: number
  y: number
}

export class Terrain {
  name: "water" | "ground" = "ground"
  unitId?: string
}

export type AWMap = Number[][]
