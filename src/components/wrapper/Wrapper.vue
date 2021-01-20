<template>
  <div class="wrapper">
      <Home />
  </div>
</template>

<script>
import Home from '@/components/Home/Home'
import './Wrapper.less'

import { Renderer, Camera, Transform, Plane } from 'ogl'
import NormalizeWheel from 'normalize-wheel'

import Media from '@/assets/js/utils/Media'
import DotGrid from './DotGrid'
import { lerp } from '@/assets/js/utils/Math'

export default {
  name: 'Wrapper',
  components: {Home},
  mounted() {
    this.storeScroll = this.$store.state.wrapper.scroll
    this.storeWrapper = this.$store.state.wrapper

    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()

    this.createGeometry()
    this.createMedias()

    this.createDotNoise()

    this.update()

    this.addEventListeners()
  },
  methods: {
    createRenderer() {
      this.renderer = new Renderer({
        alpha: true,
      })

      this.$store.commit('wrapper', { type: 'gl', value: this.renderer.gl })

      this.$el.appendChild(this.storeWrapper.gl.canvas)
    },

    createCamera() {
      const camera = new Camera(this.storeWrapper.gl, { fov: 45 })
      camera.position.z = 5

      this.$store.commit('wrapper', { type: 'camera', value: camera })
    },

    createScene() {
      this.$store.commit('wrapper', { type: 'scene', value: new Transform() })
    },

    createGeometry() {
      const planeGeometry = new Plane(this.storeWrapper.gl, {
        widthSegments: 20,
      })

      this.$store.commit('wrapper', {
        type: 'planeGeometry',
        value: planeGeometry,
      })
    },

    createMedias() {
      const mediasElements = document.querySelectorAll(
        '.demo-2__gallery__figure'
      )

      mediasElements.forEach((element) => {
        let media = new Media({
          element,
          geometry: this.storeWrapper.planeGeometry,
          gl: this.storeWrapper.gl,
          scene: this.storeWrapper.scene,
          screen: this.$store.state.screen,
          viewport: this.storeWrapper.viewport,
          width: this.storeWrapper.width,
        })

        this.$store.commit('addImage', media)
      })
    },

    createDotNoise() {
      const background = new DotGrid({gl: this.storeWrapper.gl, scene: this.storeWrapper.scene, screen: this.$store.state.screen})
      this.$store.commit('wrapper', { type: 'dotGrid', value: background })
    },

    /**
     * Events.
     */
    onTouchDown(event) {
      this.$store.commit('wrapperScroll', { type: 'isDown', value: true })

      this.$store.commit('wrapperScroll', {
        type: 'position',
        value: this.storeScroll.current,
      })
      this.$store.commit('wrapperScroll', {
        type: 'start',
        value: event.touches ? event.touches[0].clientX : event.clientX,
      })
    },

    onTouchMove(event) {
      if (!this.storeScroll.isDown) return

      const x = event.touches ? event.touches[0].clientX : event.clientX
      const distance = (this.storeScroll.start - x) * 2

      this.$store.commit('wrapperScroll', {
        type: 'target',
        value: this.storeScroll.position + distance,
      })
    },

    /* eslint-disable */
    onTouchUp(event) {
      this.$store.commit('wrapperScroll', { type: 'isDown', value: false })
    },

    onWheel(event) {
      const normalized = NormalizeWheel(event)
      const speed = normalized.pixelY

      const newTarget = this.storeScroll.target + speed * 0.2
      this.$store.commit('wrapperScroll', { type: 'target', value: newTarget })
    },

    /**
     * Resize.
     */
    onResize() {
      this.$store.commit('screen', {
        height: window.innerHeight,
        width: window.innerWidth,
      })

      this.renderer.setSize(this.$store.state.screen.width, this.$store.state.screen.height)

      this.storeWrapper.camera.perspective({
        aspect: this.storeWrapper.gl.canvas.width / this.storeWrapper.gl.canvas.height,
      })

      const fov = this.storeWrapper.camera.fov * (Math.PI / 180)
      const height = 2 * Math.tan(fov / 2) * this.storeWrapper.camera.position.z
      const width = height * this.storeWrapper.camera.aspect

      this.$store.commit('wrapper', {
        type: 'viewport',
        value: {
          height,
          width,
        },
      })

      const wrapperBounds = this.$el.getBoundingClientRect()
      this.$store.commit('wrapper', {type: 'width', value: (this.storeWrapper.viewport.width * wrapperBounds.width) / this.$store.state.screen.width})

      if (this.storeWrapper.images) {
        this.storeWrapper.images.forEach((media) =>
          media.onResize({
            screen: this.$store.state.screen,
            viewport: this.storeWrapper.viewport,
            width: this.storeWrapper.width,
          })
        )
      }
    },

    /**
     * Update.
     */
    update() {
      const scrollCurrent = lerp(
        this.storeScroll.current,
        this.storeScroll.target,
        this.storeScroll.ease
      )
      this.$store.commit('wrapperScroll', {
        type: 'current',
        value: scrollCurrent,
      })

      if (this.storeScroll.current > this.storeScroll.last) {
        this.$store.commit('wrapperScroll', {
          type: 'direction',
          value: 'down',
        })
        this.$store.commit('wrapperScroll', { type: 'speed', value: 2 })
      } else if (this.storeScroll.current < this.storeScroll.last) {
        this.$store.commit('wrapperScroll', { type: 'direction', value: 'up' })
        this.$store.commit('wrapperScroll', { type: 'speed', value: -2 })
      }

      if (this.storeWrapper.images) {
        this.storeWrapper.images.forEach((media) =>
          media.update(this.storeScroll, this.storeScroll.direction)
        )
      }
      this.storeWrapper.dotGrid.update(this.storeScroll.current)

      this.renderer.render({
        scene: this.storeWrapper.scene,
        camera: this.storeWrapper.camera,
      })

      this.$store.commit('wrapperScroll', {
        type: 'last',
        value: this.storeScroll.current,
      })

      window.requestAnimationFrame(this.update.bind(this))
    },

    /**
     * Listeners.
     */
    addEventListeners() {
      window.addEventListener('resize', this.onResize.bind(this))

      window.addEventListener('mousewheel', this.onWheel.bind(this))
      window.addEventListener('wheel', this.onWheel.bind(this))

      window.addEventListener('mousedown', this.onTouchDown.bind(this))
      window.addEventListener('mousemove', this.onTouchMove.bind(this))
      window.addEventListener('mouseup', this.onTouchUp.bind(this))

      window.addEventListener('touchstart', this.onTouchDown.bind(this))
      window.addEventListener('touchmove', this.onTouchMove.bind(this))
      window.addEventListener('touchend', this.onTouchUp.bind(this))
    },
  },
}
</script>
