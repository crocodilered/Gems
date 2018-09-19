class Gem {
  constructor (color, weight) {
    this.color = color
    this.weight = weight
  }

  static randomColor (gemTypesCount) {
    return Math.floor(Math.random() * gemTypesCount) + 1
  }
}

class Model {
  constructor (size, gemTypesCount) {
    this.EMERALD = 1 // green
    this.RUBY = 2 // red
    this.DIAMOND = 3 // white

    this.table = []
    this.size = size
    this.gemTypesCount = gemTypesCount
  }

  randomGem () {
    const color = Gem.randomColor(this.gemTypesCount)
    return new Gem(color, 1)
  }

  get (x, y) {
    if (this.table[y]) return this.table[y][x]
    return null
  }

  set (x, y, gem) {
    this.table[y][x] = gem
  }

  setData (data) {
    this.table = data
  }

  clear (x, y) {
    this.table[y][x] = null
  }

  /**
   * Populate model with gems.
   */
  populate () {
    for (let y = 0; y < this.size.height; y++) {
      let row = []
      for (let x = 0; x < this.size.width; x++) {
        row.push(this.randomGem(this.gemTypesCount))
      }
      this.table.push(row)
    }
  }

  // Return data copy
  copyData () {
    let tableCopy = []
    for (let y = 0; y < this.size.height; y++) {
      let row = []
      for (let x = 0; x < this.size.width; x++) {
        const gem = this.get(x, y)
        row.push(Object.assign({}, gem))
      }
      tableCopy.push(row)
    }
    return tableCopy
  }

  /**
   * Refill empty cells with random gems of small size
   */
  refillEmptyCells () {
    for (let y = 0; y < this.size.height; y++) {
      for (let x = 0; x < this.size.width; x++) {
        if (!this.get(x, y)) {
          this.set(x, y, this.randomGem())
        }
      }
    }
  }

  collapseEmptyCells () {
    for (let y = 0; y < this.size.height; y++) {
      for (let x = 0; x < this.size.width; x++) {
        if (!this.get(x, y)) {
          // Shift all the upper gems down
          for (let y1 = y; y1 > 0; y1--) {
            this.set(x, y1, this.get(x, y1 - 1))
          }
        }
      }
    }
  }
}

export default Model
