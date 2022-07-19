import { Unit } from "./types"

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

  constructor(
    private height: number,
    private width: number,
    private readonly unit: Unit
  ) {
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
      console.log(openList)
      const front = openList.shift()!

      if (this.costs.get(front.index) !== undefined) {
        continue
      }

      const currentCost = front.currentCost
      this.costs.set(front.index, currentCost)

      for (let i = 0; i < 4; i++) {
        if (i === 0) {
          console.log("here")
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
        }

        neighboursCosts = 1
        if (neighboursCosts >= 0) {
          // passable?
          // costs to reach this field
          console.log("currentCost", currentCost)

          const newCosts = neighboursCosts + currentCost
          remainingCosts = 3 - newCosts
          // usable path to target?
          if (remainingCosts >= 0) {
            const totalCost = newCosts + remainingCosts
            // node we want to insert
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
            console.log(workNode)

            openList.unshift(workNode)
            // m_OpenList.insert(std::upper_bound(m_OpenList.cbegin(), m_OpenList.cend(), workNode), workNode);
          }
        }
      }
    }
    console.log(this.costs)
  }
}
