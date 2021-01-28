export default class ElementWrapper {
  constructor({media = null, element, width, viewport, screen}) {
    this.element = element
    this.media = media
    this.width = width
    this.viewport = viewport
    this.screen = screen

    this.translation = {} // (x,y)
    this.extra = 0

    this.time = 0
  }

  hoveElement() {

  }


  updatePos (x = 0, y = 0) {
    this.translation.y = y
    this.translation.x = - x + this.extra

    // if (this.translation.x - this.bounds.width < x + this.screen.width && this.translation.x + this.bounds.width > x) {
    if (this.isOnScreen) {
      this.element.style.display = 'flex'
      this.element.style.transform = `translate3d(${this.translation.x}px, ${this.translation.y}px, 0)`
    } else {
      // this.element.style.display = 'none'
    }
  }

  update (x, direction) {
    this.bounds = this.element.getBoundingClientRect()

    this.isBefore = this.bounds.x + this.bounds.width < 0
    this.isAfter = this.bounds.x - this.bounds.width > this.screen.width

    if (direction === 'down' && this.isBefore) {
      this.extra += this.width

      this.isBefore = false
      this.isAfter = false
    } else if (direction === 'up' && this.isAfter) {
      this.extra -= this.width

      this.isBefore = false
      this.isAfter = false
    }
    this.isOnScreen = true

    // calcule
    this.updatePos(x.current)
  }

  onResize({width, screen}) {
    if(width) this.width = width
    if(screen) this.screen = screen
    
    // init
    this.bounds = this.element.getBoundingClientRect()
  }
}