import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            scrollState: 0,
            scroll: 0, 
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        }
    },
    mutations: {
        newScroll(state, scroll) {
            state.scroll = scroll
        },
        newScrollState(state, scroll) {
          state.scrollState = scroll
      }
    }
})
