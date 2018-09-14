class Gem {

  constructor (color, weight) {
    this.color = color
    this.weight = weight
  }

  static randomColor (gemTypesCount) {
    return Math.floor(Math.random() * gemTypesCount) + 1 // Two gem types only
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

  get (x, y) {
    return this.table[y][x]
  }

  set (x, y, gem) {
    this.table[y][x] = gem
  }

  clear (x, y) {
    this.table[y][x] = null
  }

  /**
   * Populate model with gems.
   * If type is defined, gems have same color == fixedColor
   */
  populate (fixedColor = null) {
    for (let y = 0; y < this.size.height; y++) {
      let row = []
      for (let x = 0; x < this.size.width; x++) {
        const color = fixedColor || Gem.randomColor(this.gemTypesCount)
        row.push(new Gem(color, 1))
      }
      this.table.push(row)
    }
  }

  /**
   * Refill empty cells with random gems of small size
   */
  refillEmptyCells () {
    for (let y = 0; y < this.size.height; y++) {
      for (let x = 0; x < this.size.width; x++) {
        if (!this.get(x, y)) {
          const color = Gem.randomColor(this.gemTypesCount)
          this.set(x, y, new Gem(color, 1))
        }
      }
    }
  }
}

export default Model
