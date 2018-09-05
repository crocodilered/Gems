class SwipeDetector {

  constructor (elem, callback) {
    if (!elem || !callback || typeof callback !== 'function') return

    this.cell = null // Selected cell
    this.callback = callback
    this.direction = ''

    this.sX = 0
    this.sY = 1
    this.eX = 0
    this.eY = 0

    this.minX = 10  // min x swipe for horizontal swipe
    this.maxX = 40  // max x difference for vertical swipe
    this.minY = 10  // min y swipe for vertical swipe
    this.maxY = 40  // max y difference for horizontal swipe

    elem.addEventListener('mousedown', event => this.swipeStart(event), false)
    elem.addEventListener('touchstart', event => this.swipeStart(event), false)

    elem.addEventListener('mousemove', event => this.swipeMove(event), false)
    elem.addEventListener('touchmove', event => this.swipeMove(event), false)

    elem.addEventListener('mouseup', event => this.swipeStop(event), false)
    elem.addEventListener('touchend', event => this.swipeStop(event), false)
  }

  swipeStart (event) {
    event.preventDefault()
    event.stopPropagation()
    /* eslint-disable no-undef */
    const point = (event instanceof TouchEvent) ? event.touches[0] : event
    this.sX = point.screenX
    this.sY = point.screenY
    this.cell = event.target
  }

  swipeMove (event) {
    event.preventDefault()
    event.stopPropagation()
    /* eslint-disable no-undef */
    const point = (event instanceof TouchEvent) ? event.touches[0] : event
    this.eX = point.screenX
    this.eY = point.screenY
  }

  swipeStop (event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.isVerticalSwipe()) {
      this.direction = (this.eX > this.sX) ? 'r' : 'l'
    } else {
      this.direction = (this.eY > this.sY) ? 'd' : 'u'
    }
    this.callback(this.cell, this.direction)
  }

  isVerticalSwipe () {
    const a = ((this.eX - this.minX > this.sX) || (this.eX + this.minX < this.sX))
    const b = ((this.eY < this.sY + this.maxY) && (this.sY > this.eY - this.maxY) && (this.eX > 0))
    return (a && b)
  }

}

export default SwipeDetector
