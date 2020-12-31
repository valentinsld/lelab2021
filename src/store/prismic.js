import axios from 'axios'

class Prismic {
    constructor() {
        this.server = 'https://lelab.cdn.prismic.io/api/v2'
        this.search = '/documents/search?'
        this.params = {
            // ref: '',
            q: '[[any(document.type%2C["homr"%2C"experience"])]]',
            orderings: '[my.experience.date+desc]',
            pageSize: '100'
        }

        this.getRef()

        this.test1 = 'http://localhost:8080/json/api-v2.json'
        this.test2 = 'http://localhost:8080/json/search.json'
    }
    init(store) {
        this.store = store

        this.getRef()
    }
    getRef() {
        axios.get(this.test1).then(response => {
            response.data.refs.forEach(ref => {
                if (ref.isMasterRef) {
                    this.params.ref = ref.ref
                    this.getData()
                }
            })
        })
    }
    getData(api = this.test2) {
        let url = this.server + this.search

        for (const [key, value] of Object.entries(this.params)) {
            url += `${key}=${value}&`
        }
        url
        // console.log(url)

        axios.get(api).then(response => {
            this.sortData(response.data.results)
        })
    }
    sortData(data) {
        // console.log(data)
        let newData = this.store.state.prismic

        data.forEach(d => {
            if (d.type === 'experience') {
                const date = d.data.date.split('-')

                const newExp = {
                    name: d.data.title[0].text,
                    version: d.data.version,
                    bigTitle: d.data.big_title,
                    thumbnail: d.data.thumbnail.url,
                    link: d.data.link.url,
                    month: this.store.state.month[date[1] - 1],
                    year: date[0]
                }

                newData.experiences.push(newExp)
            
            } else if (d.type === 'homr') {
                d.data.hello.forEach(h => {
                    newData.home.text += h.text + '<br/>'
                })
                newData.home.scroll = d.data.scroll[0].text
            }
        })

        this.store.commit('initPrismic', newData)
    }
}

export default new Prismic()
