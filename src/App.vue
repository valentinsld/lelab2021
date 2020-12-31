<template>
    <Cursors />
    <Nav />
    <Intro v-if="true" />
    <router-view />
</template>

<script>
import 'normalize.css'
import '@/assets/global.less'

import Nav from '@/components/global/Nav.vue'
import Intro from '@/components/global/Intro.vue'
import Cursors from '@/components/global/Cursors.vue'

export default {
    components: {
        Nav,
        Intro,
        Cursors,
    },
    mounted() {
        console.log(this.$store.state.scroll)
    },
}
</script>
