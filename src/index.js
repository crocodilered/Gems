import App from 'App.js'
import 'css/index.css'

window.addEventListener('load', () => {

  const startButton = document.getElementById('startButton')
  startButton.addEventListener('click', event => {
    document.getElementById('options').classList.add('hide')

    document.getElementById('toolbar').classList.add('show')
    document.getElementById('app').classList.add('show')

    const app = new App()
    app.run()
  })
  
  document.getElementById('options').style.opacity = 1
})
