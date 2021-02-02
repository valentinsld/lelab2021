import {Plane, Mesh, Program, Vec2} from 'ogl'

import dotShader from '@/assets/glsl/dotGrid'

export default class DotGrid{
  constructor({gl, camera, scene, screen}) {
    this.gl = gl
    this.camera = camera
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

    // size plane
    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.planeMesh.scale.x = width * 3 * -1
    this.planeMesh.scale.y = height * 3 * -1

    this.planeMesh.setParent(this.scene)
  }

  update(scroll) {
    this.program.uniforms.u_time.value += 0.02
    this.program.uniforms.u_scroll.value = scroll / this.screen.width
  }

}