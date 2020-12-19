<template>
    <div class="home">
        <p class="home__text" ref="text">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam.
        </p>
        <p class="home__scroll" ref="scroll">Scroll</p>
    </div>
</template>

<script>
import './Home.less'

import gsap from 'gsap'
import SplitText from '@/assets/js/greensock/utils/SplitText'

gsap.registerPlugin(SplitText)

export default {
    name: 'Home',
    mounted() {
        const textWords = new SplitText(this.$refs.text, {
            type: 'words',
            wordsClass: 'word',
        }).words
        const scrollChars = new SplitText(this.$refs.scroll, {
            type: 'chars',
            charsClass: 'char',
        }).chars

        const tl = gsap.timeline()

        tl.to(textWords, {
            delay: 6.7,
            y: 0,
            opacity: 1,
            ease: 'Power4.out',
            duration: 0.7,
            stagger: 0.025,
        }).to(scrollChars, {
            y: 0,
            opacity: 1,
            ease: 'Power3.out',
            duration: 0.5,
            stagger: 0.1
        })
    },
}
</script>
