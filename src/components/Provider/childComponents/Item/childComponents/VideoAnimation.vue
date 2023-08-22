<template>
    <canvas id='canvasRef' :className="class" ref='canvasRef' />
</template>

<script>
import gsap from 'gsap';
let ctx;

export default {
    data() {
        return {
            images: [],
            frames: {
                frame: 1,
            },
            widthCanvas: 0,
            heightCanvas: 0,
            canvasTransition: {},
        }
    },
    props: {
        class: String,
        dataImageId: Number
    },
    computed: {
        mediaArray() {
            return this.$store.state.mediaArray
        }
    },
    methods: {
        render() {
            if (this.images[this.frames.frame]) {
                this.canvasTransition.clearRect(
                    0,
                    0,
                    this.widthCanvas,
                    this.heightCanvas
                );
                this.canvasTransition.drawImage(this.images[this.frames.frame], 0, 0);
            } 
        }
    },
    mounted() {
        
        this.images = this.mediaArray.images[this.dataImageId];

        this.canvasTransition = this.$refs.canvasRef.getContext('2d');
        this.$refs.canvasRef.width = this.widthCanvas = this.images[0]?.width;
        this.$refs.canvasRef.height = this.heightCanvas = this.images[0]?.height;


        ctx = gsap.context(() => {
            gsap.to(this.frames, {
                frame: this.images?.length,
                snap: 'frame',
                ease: 'none',
                onUpdate: this.render,
                scrollTrigger: {
                    trigger: document.getElementById('provider'),
                    start: 'top top',
                    end: '+=80%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });


        }, this.$refs.canvasRef)

    },
    unmounted() {
        ctx?.revert();
    }
}

</script>