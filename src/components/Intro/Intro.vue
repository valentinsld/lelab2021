<template>
    <div class="intro">
        <div class="intro__content">
            <h1 class="intro__title" ref="title">Le lab</h1>
            <p class="intro__subTitle" ref="subTitle">
                by
                <a href="https://www.valentinsld.fr/" target="_blank">Valentin Sld</a>
            </p>
        </div>
    </div>
</template>

<script>
import './Intro.less'

import gsap from 'gsap'
import { RoughEase } from 'gsap/EasePack'
import SplitText from '@/assets/js/greensock/utils/SplitText'

gsap.registerPlugin(SplitText, RoughEase)

export default {
    name: 'Intro',
    mounted() {
        this.$nextTick(() => {
            this.animation()
        })
    },
    methods: {
        animation() {
            const { title, subTitle } = this.$refs

            let tl = gsap.timeline(),
                titleSplit = new SplitText(title, {
                    type: 'chars',
                    charsClass: 'char',
                }).chars,
                subTitleSplit = new SplitText(subTitle, {
                    type: 'chars',
                    charsClass: 'char',
                }).chars

            const easeRough = RoughEase.ease.config({
                template: 'Power0.easeOut',
                strength: 1.3,
                points: 25,
                taper: 'out',
                randomize: true,
                clamp: false,
            })

            const { staggerTitle } = this.$store.state

            tl.to(
                titleSplit,
                {
                    duration: 1.2,
                    y: 0,
                    opacity: 1,
                    ease: easeRough,
                    stagger: function (index) {
                        return staggerTitle[index]
                    },
                },
                '+=.5'
            )
                .to(
                    subTitleSplit,
                    {
                        duration: 0.8,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                        stagger: 0.03,
                    },
                )
                .to(this.$el, {
                    delay: .8,
                    duration: 1,
                    opacity: 0,
                    ease: 'power2.out',
                })
        },
    },
}
</script>
