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
  startingCoord: Point

  constructor(
    private readonly map: Readonly<AWMap>,
    private readonly unit: Readonly<Unit>
  ) {
    this.height = map.length
    this.width = map[0].length
    console.log(this.map[0][0])

    this.startingCoord = createPoint(
      unit.coord % this.width,
      Math.floor(unit.coord / this.width)
    )
    this.costs = new Map<number, number>()
  }

  private getIndex(point: Point) {
    return point.x + point.y * this.width
  }

  explore() {
    const index = this.getIndex(this.startingCoord)
    const openList: Node[] = []
    openList.push({
      coord: this.startingCoord,
      lastNode: this.startingCoord,
      index,
      totalCost: 0,
      currentCost: 0,
      distance: 0
    })
    let neighboursIndex = this.unit.coord
    let remainingCosts: number
    let neighboursX = -1
    let neighboursY = -1
    let fieldCost = -1
    let neighboursCosts = -1
    while (openList.length) {
      console.log(openList[0])
      const front = openList.shift()!
      if (this.costs.get(front.index) !== undefined) {
        continue
      }
      const currentCost = front.currentCost
      console.log(front.index)
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
                Math.abs(neighboursX - this.startingCoord.x) +
                Math.abs(neighboursY - this.startingCoord.y)
            }
            openList.push(workNode)
          }
        }
      }
    }
  }

  private getCostsOfTile(x: number, y: number) {
    console.log("x", x, "y", y)

    if (this.map[y][x].name === "water") return Infinity
    if (this.map[y][x].name === "mountain") return 2
    return 1
  }

  private indexToPoint(index: number) {
    return createPoint(Math.floor(index / this.width), index % this.width)
  }

  getAvailablePoints() {
    return this.costs as Readonly<typeof this.costs>
  }
}
