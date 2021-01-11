<template>
    <div
        class="wrapper__content"
        ref="wrapper__content"
        :style="{
            width: this.$store.state.wrapperWidth + 'px',
            transform: `translate3D(${translateX}px, 0, 0)`,
        }"
    >
        <Home />
        <div class="experiences">
            <Experience
                v-for="(exp, i) in this.$store.state.prismic.experiences"
                :key="i"
                :data="exp"
            />
        </div>
    </div>
</template>

<script>
import './experiences/Experience.less'
import Experience from './experiences/ExperienceTease'
import Home from './Home.vue'

export default {
    name: 'WrapperTease',
    props: ['translateX'],
    components: {
        Home,
        Experience,
    },
}
</script>