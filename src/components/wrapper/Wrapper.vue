<template>
  <div class="wrapper">
    <Home />
    <div class="experiences" ref="experiences">
      <Experience
          v-for="(exp, i) in this.$store.state.prismic.experiences"
          :key="i"
          :data="exp"
      />
    </div>
  </div>
</template>

<script>
import Home from '@/components/Home/Home'
import Experience from '@/components/Experience/Experience'
import './Wrapper.less'

import { Renderer, Camera, Transform, Plane } from 'ogl'
import NormalizeWheel from 'normalize-wheel'

import gsap from 'gsap'

import DotGrid from '@/assets/js/DotGrid'
import { lerp } from '@/assets/js/utils/Math'
import easingsFunctions from '@/assets/js/utils/easings'

export default {
  name: 'Wrapper',
  components: {Home, Experience},
  mounted() {
    this.storeScroll = this.$store.state.wrapper.scroll
    this.storeWrapper = this.$store.state.wrapper
    this.resized = 0

    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()

    this.createGeometry()

    this.createDotNoise()

    this.update()

    this.addEventListeners()

    setTimeout(() => {
      this.introMediaAnimation()
    }, 1000)
  },
  updated() {
    setTimeout(() => {
      this.onResize()
    }, 100)
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

    createDotNoise() {
      const background = new DotGrid({gl: this.storeWrapper.gl, scene: this.storeWrapper.scene, screen: this.$store.state.screen, camera: this.storeWrapper.camera})
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

      const newTarget = this.storeScroll.target + speed * 0.4
      this.$store.commit('wrapperScroll', { type: 'target', value: newTarget })
    },

    /**
     * Resize.
     */
    onResize() {
      this.resized += 1
      if (this.resized >= 3) {
        setTimeout(() => {
          window.location.reload()
        }, 0)
      }

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

      const wrapperBounds = this.$el.scrollWidth
      this.$store.commit('wrapper', {type: 'width', value: (this.storeWrapper.viewport.width * wrapperBounds) / this.$store.state.screen.width})

        if (this.storeWrapper.images) {
          this.storeWrapper.images.forEach((media) =>
            media.onResize({
              screen: this.$store.state.screen,
              viewport: this.storeWrapper.viewport,
              width: this.storeWrapper.width,
            })
          )
        }
        
        if (this.storeWrapper.elements) {
          this.storeWrapper.elements.forEach((el) =>
            el.onResize({
              screen: this.$store.state.screen,
              width: wrapperBounds
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

      let dir = this.storeScroll.direction
      if (this.storeScroll.current > this.storeScroll.last) {
        dir = 'down'
      } else if (this.storeScroll.current < this.storeScroll.last) {
        dir = 'up'
      }
      this.$store.commit('wrapperScroll', { type: 'direction', value: dir })
      this.$store.commit('wrapperScroll', { type: 'speed', value: -2 })

      if (this.storeWrapper.images) {
        this.storeWrapper.images.forEach((media) =>
          media.update(this.storeScroll, dir)
        )
      }

      if (this.storeWrapper.elements) {
        this.storeWrapper.elements.forEach((el) =>
          el.update(this.storeScroll, dir)
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

      const speed = -(this.storeScroll.current - this.storeScroll.target) * 0.1
      if (this.$store.state.cursors[1]) {
        this.$store.state.cursors[1].translate(Math.max(Math.min(speed, 150), -150))
      }

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

    introMediaAnimation() {
      const lengthImages = this.storeWrapper.images.length

      this.storeWrapper.images.forEach((media, index) => {

        gsap.to(media, {
          delay: 4.3 + (lengthImages - index) / lengthImages,
          duration: 3.3,
          ease: 'power4.out',
          onUpdate: function () {
            media.progressIntroAnimation = 1 - easingsFunctions.easeInOutCubic(this.progress())
          }
        })

      })

    }
  },
}
</script>
