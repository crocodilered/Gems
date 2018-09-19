// 2DO: Use https://hammerjs.github.io/

import SwipeDetector from 'classes/utils/SwipeDetector'

class View {

  constructor (rootElemId) {
    this.rootElemId = rootElemId
    this.rootElem = document.getElementById(this.rootElemId)
    this.swipeCallback = null
    this.cellSize = null // Size of cell
  }

  // Run once before 1st render
  preRender (model) {
    const body = document.body
    const doc = document.documentElement
    const w = body.clientWidth
    const h = Math.max(body.scrollHeight, body.offsetHeight, doc.clientHeight, doc.scrollHeight, doc.offsetHeight)
    if (w < h) {
      // Portrait
      this.cellSize = w / model.size.width
      // this.rootElem.style.top = ((h - w) / 2) + 'px'
      this.rootElem.style.top = '20px'
    } else {
      // Landscape
      this.cellSize = h / model.size.height
      this.rootElem.style.left = ((w - h) / 2) + 'px'
      this.rootElem.style.width = (this.cellSize * model.size.width) + 'px'
    }
    if (this.swipeCallback) {
      /* eslint-disable no-new */
      new SwipeDetector(this.rootElem, (elem, direction) => this.swipeCallback(elem, direction))
    }
  }

  render (model) {
    console.log(model.table)
    let html = ''
    if (!this.cellSize) this.preRender(model)
    for (let y = 0; y < model.size.height; y++) {
      for (let x = 0; x < model.size.width; x++) {
        html += this.cellHtml(x, y, model)
      }
    }
    this.rootElem.innerHTML = html
  }

  cellHtml (x, y, model) {
    let gem = model.get(x, y)
    let html = ''
    let css = `width: ${this.cellSize}px; height: ${this.cellSize}px;`
    if (gem) {
      let bgSize = 20 + gem.weight * 5
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
