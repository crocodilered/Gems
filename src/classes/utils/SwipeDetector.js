class SwipeDetector {

  constructor (elem, func) {
    if (!elem || !func || typeof func !== 'function') return

    this.sX = 0
    this.sY = 0
    this.eX = 0
    this.eY = 0

    this.minX = 10  // min x swipe for horizontal swipe
    this.maxX = 40  // max x difference for vertical swipe
    this.minY = 10  // min y swipe for vertical swipe
    this.maxY = 40  // max y difference for horizontal swipe
    this.direction = ''

    elem.addEventListener('touchstart', event => {
      event.preventDefault()
      let t = event.touches[0]
      this.sX = t.screenX
      this.sY = t.screenY
    }, false)

    elem.addEventListener('touchmove', event => {
      event.preventDefault()
      let t = event.touches[0]
      this.eX = t.screenX
      this.eY = t.screenY
    }, false)

    elem.addEventListener('touchend', event => {
      event.preventDefault()
      if (this.isVertSwipe()) {
        this.direction = (this.eX > this.sX) ? 'r' : 'l'
      } else if (this.isHorizSwipe()) {
        this.direction = (this.eY > this.sY) ? 'd' : 'u'
      }
      if (this.direction !== '') {
        func(elem, this.direction)
      }
    }, false)
  }

  isVertSwipe () {
    const a = ((this.eX - this.minX > this.sX) || (this.eX + this.minX < this.sX))
    const b = ((this.eY < this.sY + this.maxY) && (this.sY > this.eY - this.maxY) && (this.eX > 0))
    return (a && b)
  }

  isHorizSwipe () {
    const a = ((this.eY - this.minY > this.sY) || (this.eY + this.minY < this.sY))
    const b = ((this.eX < this.sX + this.maxX) && (this.sX > this.eX - this.maxX) && (this.eY > 0))
    return (a && b)
  }

}

export default SwipeDetector
