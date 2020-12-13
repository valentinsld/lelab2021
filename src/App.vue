<template>
  <Intro />
  <router-view />
</template>

<script>
import "normalize.css";
import "@/assets/global.less";

import Intro from "@/components/Intro.vue";

export default {
  components: {
    Intro,
  },
};
</script>
