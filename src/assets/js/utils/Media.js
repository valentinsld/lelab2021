const fragment = `
precision highp float;
 
uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
 
varying vec2 vUv;
 
void main() {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );
 
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
 
  gl_FragColor.rgb = texture2D(tMap, uv).rgb;
  gl_FragColor.a = 1.0;
}
`
const vertex = `
precision highp float;
precision highp int;
 
attribute vec3 position;
attribute vec2 uv;
 
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
 
uniform float uStrength;
uniform vec2 uViewportSizes;
 
varying vec2 vUv;
 

void main() {
  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
 
  newPosition.x += (newPosition.y - 0.5) * 0.5 * uStrength;
  newPosition.z -= 2.5 * uStrength * (1.0 - 2.0 * step(uStrength, 0.0));
 
  vUv = uv;
 
  gl_Position = projectionMatrix * newPosition;
}
`
import { Mesh, Program, Texture } from 'ogl'

export default class {
  constructor ({ element, geometry, gl, scene, screen, viewport, width }) {
    this.element = element
    this.image = this.element.querySelector('img')

    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.scene = scene
    this.screen = screen
    this.viewport = viewport
    this.width = width

    this.createMesh()
    this.createBounds()

    this.onResize()
  }

  createMesh () {
    const image = new Image()
    const texture = new Texture(this.gl)

    image.src = this.image.src
    image.onload = () => {
      program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight]
      texture.image = image
    }

    const program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
        uStrength: { value: 0 }
      },
      transparent: true
    })

    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program
    })

    this.plane.setParent(this.scene)
  }

  createBounds () {
    this.bounds = this.element.getBoundingClientRect()

    this.updateScale()
    this.updateX()
    this.updateY()

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
  }

  updateScale () {
    this.plane.scale.x = this.viewport.width * this.bounds.width / this.screen.width
    this.plane.scale.y = this.viewport.height * this.bounds.height / this.screen.height
  }

  updateX (x = 0) {
    this.plane.position.x = (-(this.viewport.width / 2) + (this.plane.scale.x / 2) + ((this.bounds.left - x) / this.screen.width) * this.viewport.width) - this.extra
  }

  updateY (y = 0) {
    this.plane.position.y = (this.viewport.height / 2) - (this.plane.scale.y / 2) - ((this.bounds.top - y) / this.screen.height) * this.viewport.height
  }

  update (x, direction) {
    this.updateScale()
    this.updateX(x.current)
    this.updateY()

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2

    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset

    if (direction === 'down' && this.isBefore) {
      this.extra -= this.width

      this.isBefore = false
      this.isAfter = false
    }

    if (direction === 'up' && this.isAfter) {
      this.extra += this.width

      this.isBefore = false
      this.isAfter = false
    }

    this.plane.program.uniforms.uStrength.value = ((x.current - x.last) / this.screen.width) * 5
  }

  /**
   * Events.
   */
  onResize (sizes) {
    this.extra = 0

    if (sizes) {
      const { width, screen, viewport } = sizes

      if (width) this.width = width
      if (screen) this.screen = screen
      if (viewport) {
        this.viewport = viewport

        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
      }
    }

    this.createBounds()
  }
}
