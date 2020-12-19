<template>
  <Nav />
  <Intro v-if="false" />
  <router-view />
</template>

<script>
import "normalize.css";
import "@/assets/global.less";

import Nav from "@/components/Nav.vue";
import Intro from "@/components/Intro.vue";

export default {
  components: {
    Nav,
    Intro,
  },
};
</script>
