<template>
    <Cursors />
    <Nav />
    <Intro v-if="false" />
    <router-view />
</template>

<script>
import 'normalize.css'
import '@/assets/global.less'

import Nav from '@/components/global/Nav.vue'
import Intro from '@/components/global/Intro.vue'
import Cursors from '@/components/global/Cursors.vue'

import Prismic from '@/store/prismic.js'

export default {
    components: {
        Nav,
        Intro,
        Cursors,
    },
    mounted() {
        console.log(this.$store.state.scroll)
        Prismic.request(this.$store)
    },
}
</script>
