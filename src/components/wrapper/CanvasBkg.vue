<template>
    <div class="containerCanvas"></div>
</template>

<script>
import p5 from 'p5'

export default {
    name: 'CanvasBkg',
    props: ['scroll'],
    mounted() {
        this.$nextTick(() => {
            this.init()
        })
    },
    methods: {
        init() {
            const sketch = (s) => {
                let noiseScale = 0.004
                let time = 0
                let grid = 22
                let midGrid = grid / 2

                s.setup = () => {
                    s.createCanvas(s.displayWidth, s.displayHeight)
                    s.noiseDetail(1, 0.4)
                }

                s.draw = () => {
                    s.background('#161616')
                    time += 0.02

                    s.translate(this.$props.scroll % grid, midGrid)
                    let more = -this.$props.scroll
                    for (let y = 0; y < s.height; y += grid) {
                        for (let x = 0; x < s.width; x += grid) {
                            let noiseVal = s.noise(
                                x * noiseScale + more / 10,
                                y * noiseScale,
                                time
                            )

                            s.stroke(noiseVal * 255)
                            s.point(x, y)
                            // s.point(x, y + 1)
                            // s.point(x + 1, y)
                            // s.point(x + 1, y + 1)
                        }
                    }
                }
            }

            new p5(sketch, this.$el)
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