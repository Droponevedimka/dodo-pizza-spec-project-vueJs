<template>
    <div ref='appRef' className='app__pizza'>
      <div className='app__pizza--background'></div>

      <div className='app__pizza--body'>
        <div className='app__pizza--container'>
          <div ref='titleRef' className='app__container--block-title pizza'>
            <p className='app__container--block-title_left'>Натуральная</p>
            <p className='app__container--block-title_right'>моцарелла</p>
          </div>
        </div>
        <div className='app__pizza--block'>
          <div ref='borderRef' className='app__pizza--block-border'></div>
          <img className='app__pizza--block-img' src='/img/title.png' />
          <div ref='blockTxtRef' className='app__pizza--block-txt'>
            Используем только цельное коровье молоко. <br />
            Никаких заменителей. От того сыр прикольно <br />
            тянется и не горит в печи.
          </div>
        </div>

        <div className='app__pizza--blockmove'>
          <div ref='moveBlockRef' className='app__pizza--move'>
            <div className='app__pizza--move-quad'></div>
            <div className='app__pizza--move-quad'></div>
          </div>

          <div ref='moveTextRef' className='app__pizza--desc'>
            <div className='app__pizza--desc-item'>100 критериев проверки</div>
            <div className='app__pizza--desc-item'>Проверка ежегодная</div>
            <div className='app__pizza--desc-item'>
              Знаем всех поставщиков, с которыми работают наши поставщики
            </div>
          </div>
        </div>

        <div ref='graphRef' className='app__pizza--graph'>
          <div className='app__pizza--graph-border'></div>
          <img className='app__pizza--graph-img' src='/img/graph.svg' />
        </div>

        <div ref='spaceRef' className='app__pizza--space'></div>
      </div>
      <div ref='footerRef' className='app__pizza--footer'></div>
    </div>
</template>
<script>
import gsap from 'gsap';
import './pizza-style.scss';

let ctx;

export default{
    computed: {
        mediaArray () {
            return this.$store.state.mediaArray
        }
    },
    mounted(){
        const elem = this.mediaArray.videos[0][0];

        elem.classList.add('app__pizza--footer-video');
        elem.muted = true;

        this.$refs.footerRef.appendChild(elem);

        ctx = gsap.context((self) => {            

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: this.$refs.borderRef,
                        start: 'top 100%',
                        scrub: 1,
                        end: '+=120%',
                        // markers: true,
                    },
                })
                .fromTo(
                    this.$refs.borderRef,
                    {
                        scale: 0.8,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                    }
                )
                .fromTo(
                    this.$refs.blockTxtRef,
                    {
                        opacity: 0,
                    },
                    { opacity: 1 }
                );

            gsap.timeline({
                scrollTrigger: {
                    trigger: this.$refs.appRef,
                    start: '5% top',
                    ease: 'none',
                    pin: this.$refs.footerRef,
                    scrub: 1,
                    endTrigger: this.$refs.spaceRef,
                    end: '30% 50%',
                    invalidateOnRefresh: true,
                    markers: true,
                    onEnter: () => {
                        // console.log('enter');
                        elem.playbackRate = 2;
                        elem.play();
                    },
                    onLeaveBack: () => {
                        // console.log('leave');
                        elem.pause();
                        elem.currentTime = 0;
                    },
                    // markers: true,
                },
            });

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: this.$refs.appRef,
                        start: 'top top',
                        pin: this.$refs.titleRef,
                        pinSpacing: false,
                        scrub: 1,
                        end: '+=50%',
                        // markers: true,
                    },
                })
                .fromTo(
                    this.$refs.titleRef,
                    {
                        opacity: 0,
                        scale: 0.85,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                    }
                );

            gsap
                .timeline({
                    scrollTrigger: {
                        startTrigger: this.$refs.moveBlockRef,
                        start: '40% 25%',
                        pin: this.$refs.moveBlockRef,
                        ease: 'none',
                        scrub: 1,
                        endTrigger: this.$refs.moveTextRef,
                        end: `+=${this.$refs.moveTextRef.offsetHeight - (this.$refs.moveBlockRef.offsetHeight)}`,
                        // markers: true,
                    },
                })
                .fromTo(
                    this.$refs.moveBlockRef,
                    {
                        scale: 0.95,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                    }
                )
                .to(this.$refs.moveBlockRef, { scale: 1, opacity: 1, duration: 20 });

            const descriptions = gsap.utils.toArray('.app__pizza--desc-item');
            descriptions.forEach((e) => {
                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: e,
                            start: '40% 40%',
                            end: '+=20%',
                            scrub: 1,
                            ease: 'none',
                        },
                    })
                    .fromTo(e, { opacity: 0.35 }, { opacity: 1, duration: 0.5 })
                    .to(e, { opacity: 1, duration: 3 })
                    .to(e, { opacity: 0.35, duration: 0.5 });
            });

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: this.$refs.graphRef,
                        start: '40% 70%',
                        ease: 'none',
                        scrub: 1,
                        end: '+=30%',
                        // markers: true,
                    },
                })
                .fromTo(
                    this.$refs.graphRef,
                    {
                        scale: 0.85,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                    }
                );
        });
    },
    unmounted() {
        ctx.revert(); 
    }
}
</script>
