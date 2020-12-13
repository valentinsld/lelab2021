<template>
    <div class="nav">
        <div class="nav__content">
            <h1 class="nav__title" ref="title">Le lab</h1>
            <p class="nav__subTitle" ref="subTitle">
                by <a href="https://www.valentinsld.fr/">Valentin Sld</a>
            </p>
        </div>
    </div>
</template>

<script>
import "./Intro.less";

import gsap from "gsap";
import { RoughEase } from "gsap/EasePack";
// import { SplitText } from "gsap/SplitText";
import SplitText from "@/assets/js/greensock/utils/SplitText";

gsap.registerPlugin(SplitText, RoughEase);

export default {
    name: "Intro",
    mounted() {
        const { title, subTitle } = this.$refs;

        let tl = gsap.timeline(),
            titleSplit = new SplitText(title, {
                type: "chars",
                charsClass: "chars",
            }),
            chars = titleSplit.chars,
            subTitleSplit = new SplitText(subTitle, {
                type: "words",
                wordsClass: "words",
            }),
            words = subTitleSplit.words;

        const easeRough = RoughEase.ease.config({
            template: "Power0.easeOut",
            strength: 1,
            points: 20,
            taper: "none",
            randomize: true,
            clamp: false,
        });

        const staggerTitle = [0.638, 0.088, 0.451, 0.253, 0.363, 0.682];

        tl.to(
            chars,
            {
                duration: 1.2,
                y: 0,
                opacity: 1,
                ease: easeRough,
                stagger: function (index) {
                    return staggerTitle[index];
                },
            },
            "+=.5"
        )
            .to(
                words,
                {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    stagger: 0.15,
                },
                "+=0.3"
            )
            .to(this.$el, {
                delay: 1.2,
                duration: 1,
                opacity: 0,
                ease: "power2.out",
            });
    },
};
</script>
