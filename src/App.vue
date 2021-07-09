<template>
  <div :class="$store.state.isMobile ? '-isMobile': ''">
    <Cursors v-if="!this.$store.state.isMobile" />
    <Nav />
    <Intro v-if="true" />
    <TurnScreen v-if="this.$store.state.turnScreen" />
    <router-view />
  </div>
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
    document.body.style.setProperty('--vh', window.innerHeight/100 + 'px')
  }
}
</script>
