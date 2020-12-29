import axios from 'axios'

class Prismic {
    constructor() {
        console.log('load')
    }
    request(store) {
        console.log('request', store.state.staggerTitle)
        store.commit('newScrollState', 600)
    }
    initPrismic(api) {
        axios.get(api).then(response => {
            console.log(response)
        })
    }
}

export default new Prismic()
