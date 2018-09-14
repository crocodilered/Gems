import 'css/NavigationDrawer.css'

class NavigationDrawer {
  constructor (buttonElemId, menuElemId) {
    this.buttonElem = document.getElementById(buttonElemId)
    this.buttonElem.style.display = 'block'
    this.buttonElem.style.opacity = '1'

    this.menuElem = document.getElementById(menuElemId)
    this.menuElem.style.display = 'block'
    this.menuElem.style.opacity = '1'

    this.buttonElem.addEventListener('click', event => {
      // Toggle menu
      this.visible() ? this.hide() : this.show()
    })

    this.menuItems = this.menuElem.getElementsByTagName('div')

    // Default menu item click event handler
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].addEventListener('click', event => {
        event.target.classList.add('selected')
        setTimeout(() => event.target.classList.remove('selected'), 100)
        this.hide()
      })
    }

    window.document.addEventListener('click', event => {
      // Close menu if blur
      for (let i = 0; i < event.path.length; i++ ) {
        if (event.path[i].id === 'nav-drawer-menu' || event.path[i].id === 'nav-drawer-btn') {
          return
        }
      }
      this.hide()
    })
  }

  visible () {
    return this.menuElem.classList.contains('show')
  }

  show () {
    this.menuElem.classList.add('show')
  }

  hide () {
    this.menuElem.classList.remove('show')
  }
}

export default NavigationDrawer
