<template>
    <div class="wrapper" ref="wrapper">
        <div class="wrapper__scrollbars" ref="scrollbar">
            <span class="scrollbar"></span>
            <span class="scrollbar"></span>
        </div>
        <WrapperTease
            v-for="(wrapp, index) in this.$data.wrapps"
            :key="index"
            :width="this.$data.wrapperWidth"
            :translateX="wrapp.translateX"
            ref="wrapper__content"
        />
        <CanvasBkg :scroll="this.$data.scroll" />
    </div>
</template>


<script>
import './Wrapper.less'
import WrapperTease from './WrapperTease.vue'
import CanvasBkg from './CanvasBkg.vue'

export default {
    name: 'Wrapper',
    components: {
        WrapperTease,
        CanvasBkg,
    },
    data() {
        return {
            scroll: 0,
            scrollState: 0,
            wrapps: [
                {
                    translateX: '0',
                },
                {
                    translateX: '',
                },
            ],
            wrapperWidth: 0,
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.init()
        })
    },
    methods: {
        init() {
            this.$data.windowWidth = window.innerWidth

            // get wrapper width & transform
            this.$data.wrapperWidth = this.$refs.wrapper__content.getWidth()

            this.$data.wrapps[0].translateX = 0
            this.$data.wrapps[1].translateX = this.$data.wrapperWidth

            // scrollbars
            this.$data.scrollbars = this.$refs.scrollbar.querySelectorAll(
                'span'
            )
            const widthScrollbar = Math.round(
                this.$data.windowWidth /
                    (this.$data.wrapperWidth / this.$data.windowWidth)
            )

            // set width scrollbars
            this.$data.scrollbars.forEach((s) => {
                s.style.width = widthScrollbar + 'px'
            })

            setTimeout(() => {
                // event Listener
                window.addEventListener('mousewheel', this.mouseWheelHandler)
                // Firefox
                window.addEventListener(
                    'DOMMouseScroll',
                    this.mouseWheelHandler
                )

                this.animation()
            }, 6500)
        },
        mouseWheelHandler(e) {
            this.$data.scrollState -= e.detail * 5
        },
        animation() {
            requestAnimationFrame(this.animation)
            let dist = this.$data.scrollState - this.$data.scroll
            this.$data.scroll += dist * 0.1

            const state = -this.$data.scroll / this.$data.wrapperWidth
            let mult = Math.round(state)
            if (mult <= 0) mult -= 1

            // moove wrapps
            this.$data.wrapps.forEach((w, i) => {
                let b = mult - ((mult + 1 - i) % 2)

                this.$data.wrapps[i].translateX =
                    this.$data.scroll - this.$data.wrapperWidth * -b
            })

            // moove scrollbars
            this.$data.scrollbars.forEach((s, i) => {
                let ii = i
                if (state <= 0) ii *= -1
                let x = ((state * 100) % 100) - ii * 100

                s.style.transform = `translate3D(${
                    (x * this.$data.windowWidth) / 100
                }px, 0, 0)`
            })
        },
    },
}
</script>