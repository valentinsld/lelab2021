<template>
    <a class="exp" :href="data.link" target="_blank">
        <h2 v-if="data.bigTitle" class="exp__title -bigTitle">
            <span v-html="data.name" ref="title"></span>
            <span v-html="data.version" class="exp__version"></span>
        </h2>
        <h2 v-else class="exp__title">
            <span v-html="data.name" ref="title"></span>
            <span v-html="data.version" class="exp__version"></span>
        </h2>
        <div class="exp__thumbnail">
            <img ref="thumbnail" :src="data.thumbnail" />
        </div>
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
        return {}
    },
    mounted() {
        this.$el.style.transform = `translate3d(0,${this.$props.data.y}%,0)`

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
            const { titleChars } = this.$data
            const { staggerTitle } = this.$store.state

            const easeRough = RoughEase.ease.config({
                template: 'Power0.easeOut',
                strength: 1.3,
                points: 25,
                taper: 'out',
                randomize: true,
                clamp: false,
            })

            this.$data.animation = gsap
                .timeline()
                .to([thumbnail, date], {
                    duration: 0.8,
                    opacity: 1,
                    ease: 'Power3.out',
                })
                .to(
                    titleChars,
                    {
                        duration: 0.4,
                        opacity: 1,
                        ease: easeRough,
                        stagger: function (index) {
                            return staggerTitle[index]
                        },
                    },
                    '-=0.8'
                )
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