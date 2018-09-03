// 2DO: Use https://hammerjs.github.io/

import SwipeDetector from 'classes/utils/SwipeDetector'

class View {

  constructor (rootElemId) {
    this.rootElemId = rootElemId
    this.rootElem = document.getElementById(this.rootElemId)
    this.swipeCallback = null
    this.cellHeight = null
  }

  render (model) {
    this.rootElem.innerHTML = this.html(model)
    let tdElems = this.rootElem.getElementsByTagName('td')
    if (!this.cellHeight) this.cellHeight = tdElems[0].clientWidth
    if (this.swipeCallback) {
      for (let i = 0; i < tdElems.length; i++) {
        /* eslint-disable no-new */
        new SwipeDetector(tdElems[i], (elem, direction) => this.swipeCallback(elem, direction))
        
        tdElems[i].style.height = `${this.cellHeight}px`
      }
    }
  }

  html (model) {
    let html = ''
    html += '<table>'
    for (let y = 0; y < model.size.height; y++) {
      html += '<tr>'
      for (let x = 0; x < model.size.width; x++) {
        const gem = model.get(x, y)
        if (gem) {
          html += `<td data-x="${x}" data-y="${y}" data-color="${gem.color}">${gem.weight}</td>`
        } else {
          html += '<td></td>'
        }
      }
      html += '</tr>'
    }
    html += '</table>'
    return html
  }

  setSwipeCallback (func) {
    if (typeof func === 'function') {
      this.swipeCallback = func
    }
  }

}

export default View
