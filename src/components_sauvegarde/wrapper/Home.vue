<template>
    <div class="home">
        <div class="home__text" ref="text" v-html="this.$store.state.prismic.home.text"></div>
        <p class="home__scroll" ref="scroll" v-html="this.$store.state.prismic.home.scroll"></p>
    </div>
</template>

<script>
import './Home.less'

import gsap from 'gsap'
import SplitText from '@/assets/js/greensock/utils/SplitText'

gsap.registerPlugin(SplitText)

export default {
    name: 'Home',
    updated() {
        this.$nextTick(() => this.initAnimation() )
    },
    methods: {
        initAnimation() {
        const textWords = new SplitText(this.$refs.text, {
            type: 'lines,chars',
            linesClass: 'line',
            charsClass: 'char',
        }).chars
        const scrollChars = new SplitText(this.$refs.scroll, {
            type: 'chars',
            charsClass: 'char',
        }).chars

        const tl = gsap.timeline()

        tl.to(textWords, {
            delay: 5,
            y: 0,
            opacity: 1,
            ease: 'Power2.out',
            duration: 0.7,
            stagger: 0.01
        }).to(scrollChars, {
            delay: 0.6,
            y: 0,
            opacity: 1,
            ease: 'Power4.out',
            duration: 0.65,
            stagger: 0.03,
        })
        }
    },
}
</script>
