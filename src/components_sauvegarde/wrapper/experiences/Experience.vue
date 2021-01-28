<template>
    <div class="experiences">
        <ExperienceTease
            v-for="(exp, i) in this.$store.state.prismic.experiences"
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
    }
}
</script>