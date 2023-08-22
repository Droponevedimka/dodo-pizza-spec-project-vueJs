<template>
    <Vue3Lottie ref='lottieAnimation' :animationData="interfaceOneJSON" :autoPlay='false' />
</template>
<script>
import gsap from 'gsap';

let ctx;

export default {
    data(){
        return {
            timeObj: { frame: 0},
        }
    },
    props: {
        interfaceOneJSON: Object
    },
    methods: {
        render(){
            this.$refs.lottieAnimation?.goToAndStop(this.timeObj.frame, true);
        }
    },
    mounted() {
        ctx = gsap.context((self) => { 
            gsap.to(this.timeObj, {
                frame: 100,
                snap: 'frame',
                ease: 'none',
                onUpdate: this.render,
                scrollTrigger: {
                    trigger: document.getElementById('provider'),
                    start: 'top top',
                    end: '+=170%',
                    scrub: 0.5,
                    // markers: true,
                    invalidateOnRefresh: true,
                },
            });
        });
    },
    unmounted() {
        ctx.revert();
    }
}
</script>