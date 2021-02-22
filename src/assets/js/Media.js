const fragment = `
precision highp float;
 
uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
uniform vec2 uCursor;
uniform float uTime;

varying vec2 vUv;
varying vec2 pos;
 
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
  gl_FragColor.a = 0.75 + (uTime * .25);

  float dist = distance(uCursor, gl_FragCoord.xy);
  gl_FragColor.rgb += 0.85 - smoothstep(dist, 0.0, 12.0);
  // float cl = clamp(1. - (dist / 10. - uTime * dist / 10.), 0.0, 1.0);
  // gl_FragColor.rgb += sin(cl * 3.14) / 10.;
}
`
const vertex = `
precision highp float;
precision highp int;
 
attribute vec3 position;
attribute vec2 uv;
 
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform vec2 uCursor;
 
uniform float uStrength;
uniform vec2 uViewportSizes;
 
varying vec2 vUv;
varying vec2 pos;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.865 - 1.894 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


void main() {
  
  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
  
  newPosition.x += (newPosition.y - 0.5) * 0.5 * uStrength;
  // float dist = distance(uCursor, newPosition.xy);
  // float moreZ = 0.2 + clamp(1. - dist, 0.1, 1.0);
  float moreZ = (snoise(newPosition.xy) / 14.5) * (1. - uTime);
  newPosition.z -= 1.7 * uStrength * (1.0 - 2.0 * step(uStrength, 0.0)) + moreZ;
  
  vUv = uv;
  pos = uv;

  gl_Position = projectionMatrix * newPosition;
}
`
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

import { Mesh, Program, Texture } from 'ogl'

export default class {
  constructor ({ element, geometry, gl, scene, screen, viewport, width, isMobile = false }) {
    this.element = element
    this.image = element
    
    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.scene = scene
    this.screen = screen
    this.viewport = viewport
    this.width = width
    
    this.hover = false
    this.time = 0

    this.isMobile = isMobile
    if (isMobile) {
      this.fuckIsMobile()
    } else {
      this.createMesh()
      this.createBounds()
  
      this.onResize()

      window.addEventListener("mousemove", this.mooveCursor.bind(this));
    }
  }

  fuckIsMobile() {
    this.image.style.opacity = 1
  }

  updateFuckingMobile(x) {
    // console.log(x.target - x.current)
    const strength = x.target - x.current
    this.image.style.transform = `translate3d(${strength / 24}px,0px,0px) skewX(${strength / 70}deg)`
  }

  createMesh () {
    const image = new Image()
    const texture = new Texture(this.gl)

    image.crossOrigin = "anonymous"
    image.src = this.image.src
    image.onload = () => {
      program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight]
      texture.image = image

      this.createBounds()
    }

    const program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
        uStrength: { value: 0 },
        uCursor: { value: [0, 0] },
        uTime: { value: this.time }
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

  updateHover (hov) {
    this.hover = hov
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

  mooveCursor(e) {
    this.plane.program.uniforms.uCursor.value = [
      e.clientX / this.gl.renderer.width * this.screen.width, 
      (-(e.clientY / this.gl.renderer.height) + 1.0) * this.screen.height]
  }

  update (x, direction) {
    if(this.isMobile) {
      this.updateFuckingMobile(x)
      return;
    }

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
  
    if (this.hover && this.time < 1) {
      this.time += 0.04
    } else if (!this.hover && this.time > 0) {
      // if (this.time > 0.1) this.time = 0.1
      this.time -= 0.04
    }
    this.plane.program.uniforms.uTime.value = easeOutCubic(this.time)
  }

  /**
   * Events.
   */
  onResize (sizes) {
    if(this.isMobile) return;

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
