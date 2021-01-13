<template>
    <div class="nav" >
        <svg class="nav__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="34.708"
            height="42.818"
            viewBox="0 0 34.708 42.818"
        >
            <g id="test" transform="translate(-48.491)">
                <g
                    id="Groupe_17"
                    data-name="Groupe 17"
                    transform="translate(68.353 19.402)"
                >
                    <g
                        id="Groupe_16"
                        data-name="Groupe 16"
                        transform="translate(0)"
                    >
                        <path
                            id="Tracé_17"
                            data-name="Tracé 17"
                            d="M286.836,232a.836.836,0,1,0,.836.836A.837.837,0,0,0,286.836,232Z"
                            transform="translate(-286 -232)"
                            fill="#fff"
                        />
                    </g>
                </g>
                <g
                    id="Groupe_19"
                    data-name="Groupe 19"
                    transform="translate(65.008 14.384)"
                >
                    <g
                        id="Groupe_18"
                        data-name="Groupe 18"
                        transform="translate(0)"
                    >
                        <path
                            id="Tracé_18"
                            data-name="Tracé 18"
                            d="M246.836,172a.836.836,0,1,0,.836.836A.837.837,0,0,0,246.836,172Z"
                            transform="translate(-246 -172)"
                            fill="#fff"
                        />
                    </g>
                </g>
                <g
                    id="Groupe_23"
                    data-name="Groupe 23"
                    transform="translate(48.491)"
                >
                    <g id="Groupe_22" data-name="Groupe 22">
                        <path
                            id="Tracé_20"
                            data-name="Tracé 20"
                            d="M82.438,34.094,71.7,15V4.874A2.509,2.509,0,0,0,70.862,0H60.827a2.509,2.509,0,0,0-.836,4.874V15L49.251,34.094a5.854,5.854,0,0,0,5.1,8.724H77.336a5.854,5.854,0,0,0,5.1-8.724ZM61.556,15.631a.836.836,0,0,0,.107-.41V5.018H62.5a.836.836,0,1,0,0-1.673H60.827a.836.836,0,1,1,0-1.673H70.862a.836.836,0,1,1,0,1.673H69.19a.836.836,0,1,0,0,1.673h.836v10.2a.836.836,0,0,0,.107.41l4.929,8.763A16.125,16.125,0,0,0,66.3,26.186a14.371,14.371,0,0,1-11.206.939Zm19.39,23.445a4.142,4.142,0,0,1-3.609,2.07H54.353a4.182,4.182,0,0,1-3.644-6.232l3.547-6.3a16.027,16.027,0,0,0,5.305.9q.4,0,.8-.02a16.237,16.237,0,0,0,6.7-1.822,14.438,14.438,0,0,1,9.014-1.47l4.9,8.713A4.142,4.142,0,0,1,80.945,39.075Z"
                            transform="translate(-48.491)"
                            fill="#fff"
                        />
                    </g>
                </g>
                <g
                    id="Groupe_25"
                    data-name="Groupe 25"
                    transform="translate(59.991 19.402)"
                >
                    <g id="Groupe_24" data-name="Groupe 24">
                        <path
                            id="Tracé_21"
                            data-name="Tracé 21"
                            d="M188.509,232a2.509,2.509,0,1,0,2.509,2.509A2.512,2.512,0,0,0,188.509,232Zm0,3.345a.836.836,0,1,1,.836-.836A.837.837,0,0,1,188.509,235.345Z"
                            transform="translate(-186 -232)"
                            fill="#fff"
                        />
                    </g>
                </g>
            </g>
        </svg>

        <div class="nav__content">
            <h2 class="nav__title">LE LAB</h2>
            <p class="nav__subtitle" target="_blank">
                By
                <a href="https://www.valentinsld.fr/" target="_blank"
                    >Valentin Sld</a
                >
            </p>
        </div>
    </div>
</template>

<script>
import './Nav.less'

import gsap from 'gsap'

export default {
    name: 'Nav',
    mounted() {
        const tl = gsap.timeline()

        tl.to(this.$el, {
            delay: 9,
            opacity: 1,
            ease: 'Power3.out',
            duration: 1.2,
        })
    }
}
</script>
