<template>
    <Cursors />
    <Nav />
    <Intro />
    <router-view />
</template>

<script>
import 'normalize.css'
import '@/assets/global.less'

import Nav from '@/components/Nav/Nav.vue'
import Intro from '@/components/Intro/Intro.vue'
import Cursors from '@/components/Cursor/Cursors.vue'

export default {
    components: {
        Nav,
        Intro,
        Cursors,
    },
}
</script>
