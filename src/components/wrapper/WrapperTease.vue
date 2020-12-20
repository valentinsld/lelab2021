<template>
    <div
        class="wrapper__content"
        ref="wrapper__content"
        :style="{ width: width + 'px', transform }"
    >
        <slot></slot>
    </div>
</template>

<script>
// import Home from './Home.vue'

export default {
    name: 'WrapperTease',
    props: ['width', 'transform'],
    // components: {
    //     Home,
    // },
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