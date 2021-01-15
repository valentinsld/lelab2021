<template>
    <div class="wrapper" ref="wrapper">
        <div class="wrapper__scrollbars" ref="scrollbar">
            <span class="scrollbar"></span>
            <span class="scrollbar"></span>
        </div>
        <WrapperTease
            v-for="(wrapp, index) in this.$data.wrapps"
            :key="index"
            :translateX="wrapp.translateX"
            ref="wrapperTease"
        />
        <CanvasBkg />
    </div>
</template>


<script>
import './Wrapper.less'
import WrapperTease from './WrapperTease.vue'
import CanvasBkg from './Canvas/CanvasBkg.vue'
// eslint-disable-next-line
import Hammer from 'hammerjs'

export default {
    name: 'Wrapper',
    components: {
        WrapperTease,
        CanvasBkg,
    },
    data() {
        return {
            wrapps: [
                {
                    translateX: '0',
                },
                {
                    translateX: '0',
                },
            ],
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.init()
        })
    },
    updated() {
        this.$nextTick(function () {
            this.initScrollBars()
        })
    },
    methods: {
        init() {
            this.$store.commit('setWrapper', this.$refs.wrapperTease.$el)

            this.$data.wrapps[0].translateX = -this.$store.state.wrapperWidth
            this.$data.wrapps[1].translateX = 0

            this.initScrollBars()

            // setTimeout(() => {
                // event Listener
                window.addEventListener('wheel', this.mouseWheelHandler)
                // Firefox
                window.addEventListener(
                    'DOMMouseScroll',
                    this.mouseWheelHandler
                )

                var hammertime = new Hammer(document);
                hammertime.get('swipe').set({
                    direction: Hammer.DIRECTION_ALL
                });
                hammertime.on('pan', (ev) => {
                    this.swipeHandler(ev)
                });

                this.animation()
            // }, 6500)
        },
        initScrollBars() {
            // scrollbars
            this.$data.scrollbars = this.$refs.scrollbar.querySelectorAll(
                'span'
            )
            const widthScrollbar = Math.round(
                this.$store.state.windowWidth /
                    (this.$store.state.wrapperWidth / this.$store.state.windowWidth)
            )

            // set width scrollbars
            this.$data.scrollbars.forEach((s) => {
                s.style.width = widthScrollbar + 'px'
            })
        },
        mouseWheelHandler(e) {
            const scroll = e.wheelDelta / 7 || e.detail
            this.$store.commit('newScrollState', this.$store.state.scrollState -= scroll * 8)
        },
        swipeHandler(e) {
            let delta;
            if(e.additionalEvent == 'panup' ||e.additionalEvent == 'pandown') {
                delta = e.deltaY;
            } else {
                delta = e.deltaY;
            }
            const scroll = delta;
            console.log(scroll, e.additionalEvent, e);
            this.$store.commit('newScrollState', this.$store.state.scrollState += scroll)
        },
        animation() {
            requestAnimationFrame(this.animation)
            let dist = this.$store.state.scrollState - this.$store.state.scroll
            // this.$store.scroll += dist * 0.1
            this.$store.commit('newScroll', this.$store.state.scroll + dist * 0.1)

            const state = -this.$store.state.scroll / this.$store.state.wrapperWidth
            let mult = Math.round(state)
            if (mult <= 0) mult -= 1

            // moove wrapps
            this.$data.wrapps.forEach((w, i) => {
                let b = mult - ((mult + 1 - i) % 2)

                this.$data.wrapps[i].translateX =
                    this.$store.state.scroll - this.$store.state.wrapperWidth * -b
            })

            // moove scrollbars
            this.$data.scrollbars.forEach((s, i) => {
                let ii = i
                if (state <= 0) ii *= -1
                let x = ((state * 100) % 100) - ii * 100

                s.style.transform = `translate3D(${
                    (x * this.$store.state.windowWidth) / 100
                }px, 0, 0)`
            })
        },
    },
}
</script>