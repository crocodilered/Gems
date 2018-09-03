
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
    let gemMoved
    if (direction === 'l' && x > 0) {
      gemMoved = this.moveGem(x, y, this.model.get(x - 1, y))
    }
    if (direction === 'u' && y > 0) {
      gemMoved = this.moveGem(x, y, this.model.get(x, y - 1))
    }
    if (direction === 'r' && x < this.model.size.width - 1) {
      gemMoved = this.moveGem(x, y, this.model.get(x + 1, y))
    }
    if (direction === 'd' && y < this.model.size.height - 1) {
      gemMoved = this.moveGem(x, y, this.model.get(x, y + 1))
    }
    if (gemMoved) this.view.render(this.model)
  }

  moveGem (x, y, gem2) {
    let gem1 = this.model.get(x, y)
    if (gem1 && gem2 && gem1.color === gem2.color) {
      if (gem1.weight > gem2.weight) {
        gem2.weight = gem1.weight - gem2.weight
      } else {
        gem2.weight += gem1.weight
      }
      this.model.clear(x, y)
      return true
    }
    return false
  }

}

export default Presenter
