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
            frameCount: 0,
            canvasTransition: {},
        }
    },
    props: {
        class: String
    },
    computed: {
        mediaArray() {
            return this.$store.state.mediaArray
        }
    },
    methods:{
        render() {
            if (this.images[this.frames.frame] && this.frames.frame < this.frameCount - 1) {
                this.canvasTransition.clearRect(
                    0,
                    0,
                    this.$refs.canvasRef.width,
                    this.$refs.canvasRef.height
                );
                this.canvasTransition.drawImage(this.images[this.frames.frame], 0, 0);
            } else {
                this.canvasTransition.fillStyle = 'black';
                this.canvasTransition.fillRect(
                    0,
                    0,
                    this.$refs.canvasRef.width,
                    this.$refs.canvasRef.height
                );
            }
        }
    },
    mounted(){
        this.images = this.mediaArray.images[3];


        this.canvasTransition = this.$refs.canvasRef.getContext('2d');
        this.$refs.canvasRef.width = this.images[0]?.width;
        this.$refs.canvasRef.height = this.images[0]?.height;

        this.frameCount = this.images?.length;

        let ctx = gsap.context(() => {
            gsap.to(this.frames, {
                frame: this.frameCount,
                snap: 'frame',
                ease: 'none',
                onUpdate: this.render,
                scrollTrigger: {
                    trigger: this.$refs.canvasRef,
                    start: 'top top',
                    end: '+=70%',
                    refreshPriority: 8,
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    // markers: true,
                },
            });


        }, this.$refs.canvasRef)

    },
    unmounted(){
        ctx?.revert();
    }
}

</script>