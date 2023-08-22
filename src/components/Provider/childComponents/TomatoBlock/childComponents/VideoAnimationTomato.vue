<template>
    <canvas id='canvasRef' :class="class" ref='canvasRef' />
</template>

<script>
import gsap from 'gsap';
let ctx;

export default {
    data() {
        return {
            allImages: [],
            allRepeatImages: [],
            frames: {
                frame: 1,
            },
            allRepeatFrames: {
                frame: 1,
            },
            widthCanvas: 0,
            heightCanvas: 0,
            isShow: true,
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
    methods: {
        render() {
            if(this.isShow){
                this.isShow = false;

                document
                    .querySelector('.app__container--block-item.tomato')
                    .classList.remove('next');
                document
                    .querySelector('.app__tomato-container')
                    .classList.remove('active');
                document
                    .querySelector('.app__black--block')
                    .classList.remove('active');
                   
            }          

            if (this.allImages[this.frames.frame]) {
                this.canvasTransition.clearRect(
                    0,
                    0,
                    this.widthCanvas,
                    this.heightCanvas
                );
                this.canvasTransition.drawImage(this.allImages[this.frames.frame], 0, 0);
            }   
        },
        renderLoop(){
            if(!this.isShow){
                this.isShow = true;
                document
                    .querySelector('.app__container--block-item.tomato')
                    .classList.add('next');
                document
                    .querySelector('.app__tomato-container')
                    .classList.add('active');
                document.querySelector('.app__black--block').classList.add('active');
            }

            if (this.allRepeatImages[this.allRepeatFrames.frame]) {
                this.canvasTransition.clearRect(
                    0,
                    0,
                    this.widthCanvas,
                    this.heightCanvas
                );
                this.canvasTransition.drawImage(this.allRepeatImages[this.allRepeatFrames.frame], 0, 0);
            }
        }
    },
    mounted() {

        this.allImages = this.mediaArray.images[2];
        this.allRepeatImages = [...this.mediaArray.images[2], ...this.mediaArray.images[0], ...this.mediaArray.images[1]];

        this.canvasTransition = this.$refs.canvasRef.getContext('2d');
        this.$refs.canvasRef.width = this.widthCanvas = this.allImages[0]?.width;
        this.$refs.canvasRef.height = this.heightCanvas = this.allImages[0]?.height;

        ctx = gsap.context(() => {
            
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

            mainTimeLine
                .to(this.frames, {
                    frame: this.allImages.length,
                    snap: 'frame',
                    duration: 4,
                    onUpdate: this.render,                   
                })
                .to(this.allRepeatFrames, {
                    frame: this.allRepeatImages.length,
                    snap: 'frame',
                    duration: 8,
                    onUpdate: this.renderLoop,
                });

        }, this.$refs.canvasRef)

    },
    unmounted() {
        ctx?.revert();
    }
}

</script>