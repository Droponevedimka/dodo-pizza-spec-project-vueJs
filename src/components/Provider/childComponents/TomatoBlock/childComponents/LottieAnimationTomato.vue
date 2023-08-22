<template>
    <div className='app__container--tomato'>
        <Vue3Lottie ref='lottieAnimation' class='app__container--block-item--lottie no-tomato' :animationData="interfaceOneJSON" :autoPlay='false' :loop='false' /> 
        <Vue3Lottie ref='lottieAnimation2' class='app__container--block-item--lottie tomato' :animationData="interfaceTwoJSON" :autoPlay='false' :loop='false' />
    </div>    
</template>
<script>
import gsap from 'gsap';

let ctx;

export default {
    data() {
        return {
            timeObj: { frame: 0 },
            timeObj2: { frame: 0 },
        }
    },
    props: {
        interfaceOneJSON: Object,
        interfaceTwoJSON: Object,
    },
    methods: {
        render() {
            this.$refs.lottieAnimation?.goToAndStop(this.timeObj.frame, true);
        },
        secondRender() {
            this.$refs.lottieAnimation2?.goToAndStop(this.timeObj2.frame, true);
        }
    },
    mounted() {
        ctx = gsap.context((self) => {

            const mainTimeLine = gsap.timeline({
                scrollTrigger: {
                    trigger: document.getElementById('provider'),
                    start: 'top top',
                    end: '+=550%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });


            mainTimeLine.to(this.timeObj, {
                frame: 100,
                snap: 'frame',
                ease: 'none',
                duration: 4,
                onUpdate: this.render,                
            })

            mainTimeLine.to(this.timeObj2, {
                frame: 150,
                snap: 'frame',
                ease: 'none',
                duration: 8,
                onUpdate: this.secondRender,               
            });
        });
    },
    unmounted() {
        ctx.revert();
    }
}
</script>