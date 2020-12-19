<template>
    <div class="intro">
        <div class="intro__content">
            <h1 class="intro__title" ref="title">Le lab</h1>
            <p class="intro__subTitle" ref="subTitle">
                by
                <a href="https://www.valentinsld.fr/" target="_blank"
                    >Valentin Sld</a
                >
            </p>
        </div>
    </div>
</template>

<script>
import './Intro.less'

import gsap from 'gsap'
import { RoughEase } from 'gsap/EasePack'
// import { SplitText } from "gsap/SplitText";
import SplitText from '@/assets/js/greensock/utils/SplitText'

gsap.registerPlugin(SplitText, RoughEase)

export default {
    name: 'Intro',
    mounted() {
        const { title, subTitle } = this.$refs

        let tl = gsap.timeline(),
            titleSplit = new SplitText(title, {
                type: 'chars',
                charsClass: 'chars',
            }),
            chars = titleSplit.chars,
            subTitleSplit = new SplitText(subTitle, {
                type: 'words',
                wordsClass: 'words',
            }),
            words = subTitleSplit.words

        const easeRough = RoughEase.ease.config({
            template: 'Power0.easeOut',
            strength: 1.3,
            points: 25,
            taper: 'out',
            randomize: true,
            clamp: false,
        })

        const staggerTitle = [0.638, 0.088, 0.451, 0.253, 0.363, 0.682]

        tl.to(
            chars,
            {
                duration: 1.5,
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
                words,
                {
                    duration: 0.9,
                    opacity: 1,
                    y: 0,
                    ease: 'power3.out',
                    stagger: 0.18,
                },
                '+=0.2'
            )
            .to(this.$el, {
                delay: 1.2,
                duration: 1,
                opacity: 0,
                ease: 'power2.out',
            })
    },
}
</script>
