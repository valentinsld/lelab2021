<template>
    <div class="containerCanvas">
        <canvas id="dotGrid"></canvas>
    </div>
</template>

<script>
import GlslCanvas from 'glslCanvas'

import fragmentShader from './fragmentShader.js'

export default {
    name: 'CanvasBkg',
    props: ['scroll'],
    data() {
        return {}
    },
    mounted() {
        this.$nextTick(() => {
            var canvas = document.querySelector('#dotGrid')
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            this.$data.sandbox = new GlslCanvas(canvas)
            this.$data.sandbox.load(fragmentShader)

            this.loop()
        })
    },
    methods: {
        loop() {
            requestAnimationFrame(this.loop)
            this.$data.sandbox.setUniform('u_scroll', -this.$props.scroll / window.innerWidth)
        },
    },
}
</script>

<style lang="less">
.containerCanvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>