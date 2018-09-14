import 'css/index.css'

import App from 'App.js'

window.addEventListener('load', () => {
  const startButton = document.getElementById('startButton')
  startButton.addEventListener('click', event => {
    document.getElementById('options').classList.add('hide')
    document.getElementById('app').classList.add('show')

    const app = new App()
    app.run()
  })
  
  document.getElementById('options').style.opacity = 1
})
