import { AWMap, Unit } from "./types"

interface Node {
  coord: [number, number]
  lastNode: [number, number]
  index: number
  totalCost: number
  currentCost: number
  distance: number
}

export class UnitPathFinder {
  private costs: Map<number, number>
  private directions: Map<number, number>
  private height: number
  private width: number

  constructor(private map: AWMap, private readonly unit: Unit) {
    const demensions = [map.length, map[0].length]
    this.height = demensions[0]
    this.width = demensions[1]

    this.costs = new Map<number, number>()
    this.directions = new Map<number, number>()
  }

  private getIndex(x: number, y: number) {
    return x + y * this.width
  }

  explore() {
    const index = this.getIndex(this.unit.x, this.unit.y)
    const openList: Node[] = []
    openList.push({
      coord: [this.unit.x, this.unit.y],
      lastNode: [this.unit.x, this.unit.y],
      index,
      totalCost: 0,
      currentCost: 0,
      distance: 0
    })
    let neighboursIndex = this.getIndex(this.unit.x, this.unit.y)
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
          if (front.coord[0] + 1 < this.width) {
            neighboursIndex = front.index + 1
            fieldCost = this.costs.get(neighboursIndex)!
            if (fieldCost !== undefined) {
              continue
            }
            neighboursX = front.coord[0] + 1
            neighboursY = front.coord[1]
          } else {
            continue
          }
        } else if (i === 1) {
          if (front.coord[0] > 0) {
            neighboursIndex = front.index - 1
            fieldCost = this.costs.get(neighboursIndex)!
            if (fieldCost !== undefined) {
              continue
            }
            neighboursX = front.coord[0] - 1
            neighboursY = front.coord[1]
          } else {
            continue
          }
        } else if (i === 2) {
          if (front.coord[1] + 1 < this.height) {
            neighboursIndex = front.index + this.width
            fieldCost = this.costs.get(neighboursIndex)!
            if (fieldCost !== undefined) {
              continue
            }
            neighboursX = front.coord[0]
            neighboursY = front.coord[1] + 1
          } else {
            continue
          }
        } else {
          if (front.coord[1] > 0) {
            neighboursIndex = front.index - this.width
            fieldCost = this.costs.get(neighboursIndex)!
            if (fieldCost !== undefined) {
              continue
            }
            neighboursX = front.coord[0]
            neighboursY = front.coord[1] - 1
          } else {
            continue
          }
        }
        neighboursCosts = this.getCostsOfTile(neighboursX, neighboursY)
        if (neighboursCosts >= 0) {
          const newCosts = neighboursCosts + currentCost
          remainingCosts = 3 - newCosts
          if (remainingCosts >= 0) {
            const totalCost = newCosts + remainingCosts
            const workNode: Node = {
              coord: [neighboursX, neighboursY],
              lastNode: front.coord,
              index: neighboursIndex,
              totalCost: totalCost,
              currentCost: newCosts,
              distance:
                Math.abs(neighboursX - this.unit.x) +
                Math.abs(neighboursY - this.unit.y)
            }
            openList.push(workNode)
          }
        }
      }
    }
  }

  private getCostsOfTile(x: number, y: number) {
    return 1
  }

  getCosts() {
    return this.costs
  }
}
