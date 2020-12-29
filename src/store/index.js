import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            scrollState: 0,
            scroll: 0, 
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
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
                0.283,
            ],
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
