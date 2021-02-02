<template>
  <div class="turnScreen">
    <svg ref="phone" xmlns="http://www.w3.org/2000/svg" width="20" height="40.799" viewBox="0 0 20 40.799">
      <path id="Tracé_24" data-name="Tracé 24" d="M45.631,6.46H31.682a3.026,3.026,0,0,0-3.026,3.026V44.112A3.147,3.147,0,0,0,31.8,47.259H45.509a3.147,3.147,0,0,0,3.147-3.147V9.485A3.026,3.026,0,0,0,45.631,6.46Zm1.793,37.7a1.86,1.86,0,0,1-1.86,1.86H31.748a1.86,1.86,0,0,1-1.86-1.86V9.563a1.85,1.85,0,0,1,1.85-1.85h1.748a.242.242,0,0,1,.241.219l.028.289a.95.95,0,0,0,.946.86h7.912a.95.95,0,0,0,.946-.86l.028-.289a.242.242,0,0,1,.241-.219h1.748a1.85,1.85,0,0,1,1.85,1.85v34.6Z" transform="translate(-28.656 -6.46)" fill="#fff"/>
    </svg>

    <p ref="text" class="turnScreen__title">Please, turn you device</p>

    <!-- <button class="turnScreen__button" ref="reload">Reload</button> -->
  </div>
</template>

<script>
import './style.less'

import gsap from 'gsap'
import SplitText from '@/assets/js/greensock/utils/SplitText'

gsap.registerPlugin(SplitText)

export default {
  name: 'TurnScreen',
  mounted() {
    this.initAnimationPhone()
    this.initAnimationLetters()
  },
  methods: {
    initAnimationPhone () {
      const { phone } = this.$refs

      const tl = gsap.timeline({repeat: -1, repeatDelay: 1})

      tl.to(
        phone,
        {
          rotation: 0,
          duration: 0,
          ease: "Power4.out",
        }
      )
      .to(
        phone,
        {
          rotation: 450,
          duration: 3,
          ease: "elastic.out(1, 0.3)",
        }
      )
      .to(
        phone,
        {
          delay: 2.5,
          rotation: 720,
          duration: 3,
          ease: "elastic.out(1, 0.3)",
        }
      )

    },
    initAnimationLetters () {
      const { text } = this.$refs

      const tl = gsap.timeline({repeat: -1})

      const titleSplit = new SplitText(text, {
        type: 'chars',
        charsClass: 'char',
      }).chars

      tl.to(
        titleSplit,
        {
          opacity: 0,
          rotation: -4,
          x: -10,
          duration: 0,
          stagger: 0,
        }
      )
      .to(
        titleSplit,
        {
          opacity: 1,
          rotation: 0,
          x: 0,
          duration: 0.8,
          ease: "Power4.out",
          stagger: 0.03,
        }
      )
      .to(
        titleSplit,
        {
          delay: 1.9,
          opacity: 0,
          rotation: 4,
          x: 10,
          duration: 0.8,
          ease: "Power4.inOut",
          stagger: 0.03,
        }
      )

    }
  }
}

    // this.$refs.reload.addEventListener('click', () => {
    //   this.$nextTick(() => {
    //     window.location.reload()
    //   })
    // })
</script>

