import {Plane, Mesh, Program, Vec2} from 'ogl'

import dotShader from '@/assets/glsl/dotGrid'

export default class DotGrid{
  constructor({gl, scene, screen}) {
    this.gl = gl
    this.screen = screen
    this.scene = scene
    this.time = 0

    this.init()
  }

  init () {
    this.plane = new Plane(this.gl, {
      widthSegments: 20,
    })

    this.program = new Program(this.gl, {
      vertex: `
      attribute vec3 position;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      fragment: dotShader,
      uniforms : {
        u_mouse: {value: new Vec2(0,0)},
        u_scroll: {value: 0},
        u_time: {value: 0},
        u_resolution: {value: new Vec2(this.screen.width,this.screen.height)}
      }
    });

    this.planeMesh = new Mesh(this.gl, {
      geometry: this.plane,
      program: this.program
    })
    this.planeMesh.position.z = -10
    this.planeMesh.scale.x = this.screen.width / 50
    this.planeMesh.scale.y = this.screen.height / 50

    this.planeMesh.setParent(this.scene)
  }

  update(scroll) {
    this.program.uniforms.u_time.value += 0.02
    this.program.uniforms.u_scroll.value = scroll / this.screen.width
  }

  onRezie () {

  }
}