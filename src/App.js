/**
 * Common code to make it all alive
 */

import 'css/index.css'

import View from 'classes/View'
import Model from 'classes/Model'
import Presenter from 'classes/Presenter'

class App {

  constructor () {
    const model = new Model({ width: 7, height: 7 })
    const view = new View('app')
    this.presenter = new Presenter(model, view)

    const refillButton = document.getElementById('refillButton')
    refillButton.addEventListener('click', event => this.presenter.refillEmptyCells())
  }

  run () {
    this.presenter.run()
  }

}

export default App
