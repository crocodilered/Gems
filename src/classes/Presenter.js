
class Presenter {

  constructor (model, view) {
    this.model = model
    this.view = view
  }

  run () {
    this.model.populate()
    this.view.setSwipeCallback((elem, direction) => this.swipeCallback(elem, direction))
    this.view.render(this.model)
  }

  swipeCallback (elem, direction) {
    let x = parseInt(elem.getAttribute('data-x'))
    let y = parseInt(elem.getAttribute('data-y'))
    if (this.moveGem(x, y, direction)) this.view.render(this.model)
  }

  moveGem (x1, y1, direction) {
    let x2 = x1
    let y2 = y1
    
    if (direction === 'l' && x1 > 0) x2 = x1 - 1
    if (direction === 'u' && y1 > 0) y2 = y1 - 1
    if (direction === 'r' && x1 < this.model.size.width - 1) x2 = x1 + 1
    if (direction === 'd' && y1 < this.model.size.height - 1) y2 = y1 + 1
    
    // Test if x2 or y2 changed
    if (x1 === x2 && y1 === y2) return false
    
    let gem1 = this.model.get(x1, y1)
    let gem2 = this.model.get(x2, y2)

    // Test if merging gems has same color
    if (gem1 && gem2 && gem1.color !== gem2.color) return false

    // Everythin is okay, merge gems
    gem2.weight = (gem1.weight > gem2.weight)
      ? gem1.weight - gem2.weight
      : gem2.weight + gem1.weight

    // Move row
    if (direction === 'l') this.moveRowLeft(x1, y1)
    if (direction === 'u') this.moveRowUp(x1, y1)
    if (direction === 'r') this.moveRowRight(x1, y1)
    if (direction === 'd') this.moveRowDown(x1, y1)

    return true
  }

  moveRowUp (pointX, pointY) {
    for (let y = pointY; y < this.model.size.height - 1; y++) {
      this.model.set(pointX, y, this.model.get(pointX, y + 1))
    }
    this.model.clear(pointX, this.model.size.height - 1)
  }

  moveRowDown (pointX, pointY) {
    for (let y = pointY; y > 0; y--) {
      this.model.set(pointX, y, this.model.get(pointX, y - 1))
    }
    this.model.clear(pointX, 0)
  }

  moveRowLeft (pointX, pointY) {
    for (let x = pointX; x < this.model.size.height - 1; x++) {
      this.model.set(x, pointY, this.model.get(x + 1, pointY))
    }
    this.model.clear(this.model.size.width - 1, pointY)
  }

  moveRowRight (pointX, pointY) {
    for (let x = pointX; x > 0; x--) {
      this.model.set(x, pointY, this.model.get(x - 1, pointY))
    }
    this.model.clear(0, pointY)
  }

}

export default Presenter
