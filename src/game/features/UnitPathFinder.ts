import Unit from "../scenes/Unit"

interface node {
  coord: [number, number]
  lastNode: [number, number]
  index: number
  totalCost: number
  currentCost: number
  distance: number
}

export class UnitPathFinder {
  constructor(
    startingCoordinate: [number, number],
    height: number,
    width: number,
    private readonly unit: Unit
  ) {}

  explore() {}
}
