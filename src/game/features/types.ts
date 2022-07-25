export interface Point {
  x: number
  y: number
}
export const createPoint = (x: number, y: number): Point => {
  return { x: x, y: y }
}
export interface Unit {
  id: string
  movePoints: number
  coord: Point
}

export interface Terrain {
  name: "water" | "ground" | "mountain"
  unit: Unit | null
}

export type AWMap = Terrain[][]
