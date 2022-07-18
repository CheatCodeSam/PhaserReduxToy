export interface Unit {
  movePoints: number
  x: number
  y: number
}

export class Terrain {
  name: "water" | "ground" = "ground"
  unit?: Unit
}
