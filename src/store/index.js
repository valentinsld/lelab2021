import { createStore } from 'vuex'
import Prismic from '@/store/prismic.js'

const store = createStore({
    state() {
        return {
            scrollState: 0,
            scroll: 0,
            wrapper: null,
            wrapperWidth: 0,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            initPage: new Date(),
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
            prismic: {
                home: {
                    text: '',
                    scroll: ''
                },
                experiences: []
            }
        }
    },
    mutations: {
        newScroll(state, scroll) {
            state.scroll = scroll
        },
        newScrollState(state, scroll) {
            state.scrollState = scroll
        },
        setWrapper(state, el) {
            console.log('set wrapper', el)
            state.wrapper = el
        },
        setWrapperWidth(state/*, value*/) {
            console.log('init wrapper width', state.wrapper.scrollWidth)
        },
        initPrismic(state, data) {
            console.log('Add data prismic', data)
            state.prismic = data

            setTimeout(() => {
                state.wrapperWidth = state.wrapper.scrollWidth
            }, 10)
        }
    }
})

export default store

Prismic.init(store)
