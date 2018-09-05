// 2DO: Use https://hammerjs.github.io/

import SwipeDetector from 'classes/utils/SwipeDetector'

class View {

  constructor (rootElemId) {
    this.rootElemId = rootElemId
    this.rootElem = document.getElementById(this.rootElemId)
    this.swipeCallback = null
    this.cellSize = null // Size of cell
  }

  // run once before 1st render
  preRender (model) {
    this.cellSize = screen.width / model.size.width
    this.rootElem.style.top = ((screen.height - screen.width) / 2) + 'px'
  }

  render (model) {
    this.rootElem.innerHTML = this.html(model)
    const cells = this.rootElem.getElementsByTagName('div')
    if (this.swipeCallback) {
      for (let i = 0; i < cells.length; i++) {
        /* eslint-disable no-new */
        new SwipeDetector(cells[i], (elem, direction) => this.swipeCallback(elem, direction))
      }
    }
  }

  html (model) {
    let html = ''
    if (!this.cellSize) this.preRender(model)
    for (let y = 0; y < model.size.height; y++) {
      for (let x = 0; x < model.size.width; x++) {
        html += this.cellHtml(x, y, model)
      }
    }
    return html
  }

  cellHtml (x, y, model) {
    let gem = model.get(x, y)
    let html = ''
    let css = `width: ${this.cellSize}px; height: ${this.cellSize}px;`
    if (gem) {
      let bgSize = 20 + gem.weight * 10
      css += ` background-size: ${bgSize}%`
      html += `<div class="cell" style="${css}" data-x="${x}" data-y="${y}" data-color="${gem.color}"></div>`
    } else {
      html += `<div class="cell" style="${css}"></div>`
    }
    return html
  }

  setSwipeCallback (func) {
    if (typeof func === 'function') {
      this.swipeCallback = func
    }
  }

}

export default View
