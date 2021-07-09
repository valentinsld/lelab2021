import { createStore } from 'vuex'
import Prismic from '@/store/prismic.js'

import isMobile from 'is-mobile'

const store = createStore({
    state() {
        return {
            turnScreen: false,
            isMobile: isMobile(),
            initTime: new Date(),
            wrapper: {
              // gl: null,
              // planeGeometry: null,
              // screen: null,
              // viewport: null,
              // wrapperWidth: null,
              scroll: {
                ease: 0.05,
                current: 0,
                target: 0,
                last: 0,
                direction: null,
                speed: 0,
              },
              elements: [],
              images: []
            },
            screen: {
              height: window.innerHeight,
              width: window.innerWidth,
            },
            cursors: [],
            staggerTitle: [
                0.638,
                0.088,
                0.451,
                0.253,
                0.363,
                0.682,
                0.121,
                0.745,
                0.283,
                // repeat
                0.638,
                0.088,
                0.451,
                0.253,
                0.363,
                0.682,
                0.121,
                0.745,
                0.283
            ],
            month: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'Sptember',
                'October',
                'November',
                'December',
            ],
            prismic: {}
        }
    },
    mutations: {
        wrapper(state, {type, value}) {
          if(type == 'scroll' || type == 'elements' || type == 'images') return;
          state.wrapper[type] = value
        },
        wrapperScroll(state, {type, value}) {
          state.wrapper.scroll[type] = value
        },
        addImage(state, value) {
          state.wrapper.images.push(value)
        },
        addElement(state, value) {
          state.wrapper.elements.push(value)
        },
        screen(state, value) {
          state.screen = value
        },
        addCursor(state, value) {
          state.cursors.push(value)
        },

        turnScreen(state, data) {
          state.turnScreen = data
        },
        initPrismic(state, data) {
            state.prismic = data
        }
    },
})

export default store

Prismic.init(store)
