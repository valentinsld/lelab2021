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
            :transform="wrapp.transform"
            ref="wrapper__content"
        />
    </div>
</template>


<script>
import './Wrapper.less'
import WrapperTease from './WrapperTease.vue'

export default {
    name: 'Wrapper',
    components: {
        WrapperTease,
    },
    data() {
        return {
            scroll: 0,
            wrapps: [
                {
                    transform: '',
                },
                {
                    transform: '',
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

            this.$data.wrapps[1].transform = `translate3D(${this.$data.wrapperWidth}px,0,0)`

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

            // event Listener
            window.addEventListener('mousewheel', this.mouseWheelHandler)
            // Firefox
            window.addEventListener('DOMMouseScroll', this.mouseWheelHandler)
        },
        mouseWheelHandler(e) {
            this.$data.scroll -= e.detail * 5

            const state = -this.$data.scroll / this.$data.wrapperWidth
            let mult = Math.round(state)
            if (mult <= 0) mult -= 1

            // moove wrapps
            this.$data.wrapps.forEach((w, i) => {
                let b = mult - ((mult + 1 - i) % 2)

                this.$data.wrapps[i].transform = `translate3D(${
                    this.$data.scroll - this.$data.wrapperWidth * -b
                }px,0,0)`
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