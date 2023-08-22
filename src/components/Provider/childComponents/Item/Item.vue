<template>
    <div ref='itemRef' :className="`app__container--block-item ${nameItem}`">
          <VideoAnimation
            className='app__container--block-item--video'
            :dataImageId='dataImageId'
          />
          <LottieAnimation
            className='app__container--block-item--lottie'
            :animationData='interfaceOneJSON'
          />
        </div>
</template>

<script>
import gsap from 'gsap';

import LottieAnimation from './childComponents/LottieAnimation';
import VideoAnimation from './childComponents/VideoAnimation'

import interfaceOneJSON from '@/assets/lottie/interf1.json';

let ctx;

export default {
    setup() {
        return {
            interfaceOneJSON
        }
    },
    components: {
        LottieAnimation, VideoAnimation
    },
    props: {
        nameItem: String,
        dataImageId: Number
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