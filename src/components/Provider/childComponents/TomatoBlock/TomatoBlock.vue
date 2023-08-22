<template>
    <div ref='itemRef' :className="`app__container--block-item ${nameItem}`">
        <AnimationTomatoVideo class='app__container--block-item--video' />
        <AnimationTomatoLottie 
        :interfaceOneJSON='interfaceOneJSON'
        :interfaceTwoJSON='interfaceTwoJSON' />
    </div>
</template>

<script>
import gsap from 'gsap';

import AnimationTomatoVideo from './childComponents/VideoAnimationTomato';
import AnimationTomatoLottie from './childComponents/LottieAnimationTomato';

import interfaceOneJSON from '@/assets/lottie/interf1.json';
import interfaceTwoJSON from '@/assets/lottie/interf2.json';

let ctx;

export default {
    setup() {
        return {
            interfaceOneJSON,
            interfaceTwoJSON 
        }
    },
    components: {
        AnimationTomatoLottie, AnimationTomatoVideo
    },
    props: {
        nameItem: String
    },
    mounted() {
        ctx = gsap.context((self) => {
            const itemLine = gsap.timeline({
                scrollTrigger: {
                    trigger: document.getElementById('provider'),
                    start: 'top top',
                    scrub: 1,
                    end: '+=50%',
                    // markers: true,
                },
            });

            itemLine.fromTo(
                this.$refs.itemRef,
                {
                    opacity: 0,
                    scale: 0,
                },
                {
                    opacity: 1,
                    scale: 1,
                }
            );

        }, this.$refs.itemRef)
    },
    unmounted() {
        ctx.revert();
    }
}
</script>