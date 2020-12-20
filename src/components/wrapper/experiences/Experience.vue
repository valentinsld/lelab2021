<template>
    <div class="experiences">
        <ExperienceTease
            v-for="(exp, i) in this.$data.experiences"
            :key="i"
            :data="exp"
        />
    </div>
</template>

<script>
import './Experience.less'
import ExperienceTease from './ExperienceTease'

export default {
    name: 'Experience',
    components: {
        ExperienceTease,
    },
    data() {
        return {
            experiences: [
                // {
                //     id: 0,
                //     name: '',
                //     thumbnail: 'https://source.unsplash.com/random/1280x720',
                //     link: '',
                //     month: '',
                //     year: '',
                // },
                {
                    name: 'Dots',
                    thumbnail: 'https://source.unsplash.com/random/1280x720',
                    link: '#',
                    month: 'novembre',
                    year: '2020',
                },
                                {
                    name: 'Woula',
                    thumbnail: 'https://source.unsplash.com/random/1280x720',
                    link: '#',
                    month: 'septembre',
                    year: '2020',
                },
            ],
        }
    },
}
</script>