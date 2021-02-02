<template>
    <Cursors v-if="!this.$store.state.isMobile" />
    <Nav />
    <Intro />
    <TurnScreen v-if="this.$store.state.turnScreen" />
    <router-view />
</template>

<script>
import 'normalize.css'
import '@/assets/global.less'

import Nav from '@/components/Nav/Nav.vue'
import Intro from '@/components/Intro/Intro.vue'
import Cursors from '@/components/Cursor/Cursors.vue'
import TurnScreen from '@/components/TurnScreen/TurnScreen.vue'

export default {
  components: {
    Nav,
    Intro,
    Cursors,
    TurnScreen,
  },
  mounted() {
    const ifVerticalScreen = window.innerHeight > window.innerWidth
    if(ifVerticalScreen) {
      this.$store.commit('turnScreen', true)
    }
  }
}
</script>
