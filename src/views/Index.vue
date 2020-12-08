<template>
  <div class="wrapper" ref="wrapper">
    <div ref="scrollbar" class="wrapper__scrollbars">
      <span class="scrollbar"></span>
      <span class="scrollbar"></span>
    </div>
    <div class="wrapper__content" ref="wrapper__content">
      <div class="div1"></div>
      <div class="div2"></div>
      <div class="div3"></div>
    </div>
  </div>
</template>

<script>
import "./index.less";
// import HelloWorld from '@/components/HelloWorld.vue'

import gsap from "gsap";
import SplitText from "@/assets/js/greensock/utils/SplitText";
gsap.registerPlugin(SplitText);

export default {
  name: "Index",
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      scroll: 0,
      wrapps: [],
    };
  },
  mounted() {
    this.$data.windowWidth = window.innerWidth;

    const { wrapper, wrapper__content } = this.$refs;

    // get wrapper width
    this.$data.wrapperWidth = wrapper__content.scrollWidth;
    wrapper__content.style.width = this.$data.wrapperWidth + "px";

    // create new wrapps
    const newContent = wrapper__content.cloneNode(true);
    newContent.style.transform = `translate3D(${this.$data.wrapperWidth}px,0,0)`;
    wrapper.append(newContent);

    // add wrapps
    this.$data.wrapps = [wrapper__content, newContent];

    // scrollbar
    this.$data.scrollbars = this.$refs.scrollbar.querySelectorAll("span");
    const widthScrollbar = Math.round(
      this.$data.windowWidth /
        (this.$data.wrapperWidth / this.$data.windowWidth)
    );
    this.$data.scrollbars.forEach((s) => {
      s.style.width = widthScrollbar + "px";
    });

    // event Listener
    window.addEventListener("mousewheel", this.mouseWheelHandler);
    // Firefox
    window.addEventListener("DOMMouseScroll", this.mouseWheelHandler);
  },
  methods: {
    mouseWheelHandler(e) {
      this.$data.scroll -= e.detail * 5;

      const state = -this.$data.scroll / this.$data.wrapperWidth;
      let mult = Math.round(state);
      if (mult <= 0) mult -= 1;

      // moove wrapps
      this.$data.wrapps.forEach((w, i) => {
        let b = mult - ((mult + 1 - i) % 2);

        w.style.transform = `translate3D(${
          this.$data.scroll - this.$data.wrapperWidth * -b
        }px,0,0)`;
      });

      // moove scrollbars
      this.$data.scrollbars.forEach((s, i) => {
        let ii = i
        if (state <= 0) ii *= -1
        let x = (state * 100) % 100 - ii * 100
        s.style.transform = `translate3D(${x*this.$data.windowWidth/100}px, 0, 0)`;
      });
    },
  },
};
</script>