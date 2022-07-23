import { AWMap, createPoint, Point, Unit } from "./types"

interface Node {
  coord: Point
  lastNode: Point
  index: number
  totalCost: number
  currentCost: number
  distance: number
}

export class UnitPathFinder {
  private costs: Map<number, number>
  private height: number
  private width: number

  constructor(
    private readonly map: Readonly<AWMap>,
    private readonly unit: Readonly<Unit>
  ) {
    this.height = map.length
    this.width = map[0].length
    this.costs = new Map<number, number>()
  }

  private getIndex(point: Point) {
    return point.x + point.y * this.width
  }

  explore() {
    const index = this.getIndex(this.unit.coord)
    const openList: Node[] = []
    openList.push({
      coord: this.unit.coord,
      lastNode: this.unit.coord,
      index,
      totalCost: 0,
      currentCost: 0,
      distance: 0
    })
    let neighboursIndex = this.getIndex(this.unit.coord)
    let remainingCosts: number
    let neighboursX = -1
    let neighboursY = -1
    let fieldCost = -1
    let neighboursCosts = -1
    while (openList.length) {
      const front = openList.shift()!
      if (this.costs.get(front.index) !== undefined) {
        continue
      }
      const currentCost = front.currentCost
      this.costs.set(front.index, currentCost)
      for (let i = 0; i < 4; i++) {
        if (i === 0) {
          if (front.coord.x + 1 < this.width) {
            neighboursIndex = front.index + 1
            fieldCost = this.costs.get(neighboursIndex)!
            if (fieldCost !== undefined) {
              continue
            }
            neighboursX = front.coord.x + 1
            neighboursY = front.coord.y
          } else {
            continue
          }
        } else if (i === 1) {
          if (front.coord.x > 0) {
            neighboursIndex = front.index - 1
            fieldCost = this.costs.get(neighboursIndex)!
            if (fieldCost !== undefined) {
              continue
            }
            neighboursX = front.coord.x - 1
            neighboursY = front.coord.y
          } else {
            continue
          }
        } else if (i === 2) {
          if (front.coord.y + 1 < this.height) {
            neighboursIndex = front.index + this.width
            fieldCost = this.costs.get(neighboursIndex)!
            if (fieldCost !== undefined) {
              continue
            }
            neighboursX = front.coord.x
            neighboursY = front.coord.y + 1
          } else {
            continue
          }
        } else {
          if (front.coord.y > 0) {
            neighboursIndex = front.index - this.width
            fieldCost = this.costs.get(neighboursIndex)!
            if (fieldCost !== undefined) {
              continue
            }
            neighboursX = front.coord.x
            neighboursY = front.coord.y - 1
          } else {
            continue
          }
        }

        neighboursCosts = this.getCostsOfTile(neighboursX, neighboursY)
        if (neighboursCosts >= 0) {
          const newCosts = neighboursCosts + currentCost
          remainingCosts = this.unit.movePoints - newCosts
          if (remainingCosts >= 0) {
            const totalCost = newCosts + remainingCosts
            const workNode: Node = {
              coord: createPoint(neighboursX, neighboursY),
              lastNode: front.coord,
              index: neighboursIndex,
              totalCost: totalCost,
              currentCost: newCosts,
              distance:
                Math.abs(neighboursX - this.unit.coord.x) +
                Math.abs(neighboursY - this.unit.coord.y)
            }
            openList.push(workNode)
          }
        }
      }
    }
  }

  private getCostsOfTile(x: number, y: number) {
    if (this.map[y][x] === 1) return Infinity
    if (this.map[y][x] === 2) return 2
    return 1
  }

  private indexToPoint(index: number) {
    return createPoint(Math.floor(index / this.width), index % this.width)
  }

  getAvailablePoints() {
    const retVal: Point[] = []
    this.costs.forEach((_, key) => retVal.push(this.indexToPoint(key)))
    return retVal
  }
}
