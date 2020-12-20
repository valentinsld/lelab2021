<template>
    <a class="exp" :href="data.link">
        <h2 class="exp__title" ref="title">{{ data.name }}</h2>
        <img class="exp__thumbnail" ref="thumbnail" :src="data.thumbnail" />
        <p class="exp__date" ref="date">{{ data.month }} {{ data.year }}</p>
    </a>
</template>

<script>
import gsap from 'gsap'
import { RoughEase } from 'gsap/EasePack'
import SplitText from '@/assets/js/greensock/utils/SplitText'

gsap.registerPlugin(SplitText, RoughEase)

export default {
    name: 'ExperienceTease',
    props: ['data'],
    data() {
        return {
            staggerTitle: [
                0.638,
                0.088,
                0.451,
                0.253,
                0.363,
                0.682,
                0.121,
                0.745,
                0.283,
            ],
        }
    },
    mounted() {
        const random = Math.floor(Math.random() * 200) - 50
        this.$el.style.transform = `translate3d(0,${random}%,0)`

        this.$el.addEventListener('mouseover', this.animationHover)
        this.$el.addEventListener('mouseout', this.animationOut)

        this.$data.titleChars = new SplitText(this.$refs.title, {
            type: 'chars',
            charsClass: 'char',
        }).chars
    },
    methods: {
        animationHover() {
            const { thumbnail, date } = this.$refs
            const { titleChars, staggerTitle } = this.$data

            console.log('animation')

            const easeRough = RoughEase.ease.config({
                template: 'Power0.easeOut',
                strength: 1.3,
                points: 25,
                taper: 'out',
                randomize: true,
                clamp: false,
            })

            this.$data.animation = gsap.timeline()
                .to(titleChars, {
                    duration: 0.5,
                    opacity: 1,
                    ease: easeRough,
                    stagger: function (index) {
                        return staggerTitle[index]
                    },
                })
                .to([thumbnail, date], {
                    duration: 0.75,
                    opacity: 1,
                    ease: 'Power1.out',
                }, '-=0.2')
        },
        animationOut() {
            const { thumbnail, date } = this.$refs
            const { titleChars } = this.$data

            this.$data.animation.kill()

            gsap.to([thumbnail, date, titleChars], {
                duration: 0.65,
                opacity: 0.35,
                ease: 'Power1.out',
            })
        },
    },
}
</script>