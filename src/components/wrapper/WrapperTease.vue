<template>
    <div
        class="wrapper__content"
        ref="wrapper__content"
        :style="{ width: width + 'px', transform: `translate3D(${translateX}px, 0, 0)` }"
    >
        <Home />
        <div class="div1"></div>
        <div class="div2"></div>
    </div>
</template>

<script>
import Home from './Home.vue'

export default {
    name: 'WrapperTease',
    props: ['width', 'translateX'],
    components: {
        Home,
    },
    methods: {
        getWidth() {
            return this.$el.scrollWidth
        },
        setTransform(transformation) {
            this.$el.style.transfom = transformation
        },
    },
}
</script>