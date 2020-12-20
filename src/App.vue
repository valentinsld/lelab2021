<template>
  <Cursors />
  <Nav />
  <Intro v-if="true" />
  <router-view />
</template>

<script>
import "normalize.css";
import "@/assets/global.less";

import Nav from "@/components/Nav.vue";
import Intro from "@/components/Intro.vue";
import Cursors from "@/components/Cursors.vue";

export default {
  components: {
    Nav,
    Intro,
    Cursors,
  },
};
</script>
