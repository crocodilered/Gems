import App from 'App.js'
import 'css/index.css'

window.addEventListener('load', () => {
  const app = new App()
  app.run()
  document.getElementById('app').style.opacity = 1
})
