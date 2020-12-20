<template>
    <div >
        <div id="cursor"></div>
        <div id="cursorS"></div>
    </div>
</template>

<script>
import Cursor from '@/assets/js/Cursor'

export default {
    name: 'Cursors',
    data() {
        return {}
    },
    mounted() {
        this.$nextTick(() => {
            this.initCursors()
        })
    },
    methods: {
        initCursors() {
            this.$data.cursor1 = new Cursor({ id: '#cursor', speed: 0.5 })
            this.$data.cursor2 = new Cursor({ id: '#cursorS', speed: 0.15 })

            console.log('woula')
            this.tick()
        },
        tick() {
          requestAnimationFrame(this.tick);

          this.$data.cursor1.animate();
          this.$data.cursor2.animate();
        }
    },
}
</script>

<style>
/* cursor */
#cursor,
#cursorS {
    border-radius: 100px;
    /* opacity: 0.8; */

    position: fixed;
    z-index: 999;
    pointer-events: none;
    top: 0;
    left: 0;

    transform: translate(-50%, -50%);
    mix-blend-mode: difference;

    transition: transform 300ms ease;
}
#cursor {
    background: var(--white);
    width: 16px;
    height: 16px;
}
#cursorS {
    width: 48px;
    height: 48px;

    border: 1px solid var(--white);
}

.hov #cursor,
.hov #cursorS {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.3);
}
</style>