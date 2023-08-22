<template>
    <div id='provider' ref='appRef' className='app--provider'>
          <div ref='tomatoRef' className='app__tomato'>
            <div className='app__tomato-container'>
              <TomatoBLock nameItem='tomato' />
              <div className='app__black--block'>
                <Text />
              </div>
            </div>
          </div>
          <div ref='containerRef' className='app__container'>
            <div className='app__container--block'>
              <Item
                nameItem='cheese'
                :dataImageId='0'
                :key="'0000'"
              />
              <Item
                nameItem='mush'
                :dataImageId='1'
                :key="'1111'"
              />
              <div ref='titleRef' className='app__container--block-title'>
                <p className='app__container--block-title_left'>Выбираем</p>
                <p className='app__container--block-title_right'>поставщиков</p>
              </div>
            </div>
          </div>

          <TransitionBack class='app__transition' />

          <div id='blackContainer' ref='blackRef' className='app__black'></div>
        </div>
</template>

<script>
import gsap from 'gsap';

import Item from './childComponents/Item/Item.vue';
import TransitionBack from './childComponents/TransitionBack/TransitionBack.vue';
import TomatoBLock from './childComponents/TomatoBlock/TomatoBlock.vue';
import Text from './childComponents/Text/Text.vue';

let ctx;

export default {
    components: {
        Item, TransitionBack, TomatoBLock, Text
    },
    computed: {
        mediaArray() {
            return this.$store.state.mediaArray
        }
    },
    mounted() {
        const elem = this.mediaArray.videos[0][0];
        ctx = gsap.context((self) => {   
            gsap.timeline({
              scrollTrigger: {
                trigger: this.$refs.appRef,
                start: 'top top',
                pin: this.$refs.tomatoRef,
                scrub: 1,
                refreshPriority: 9,
                invalidateOnRefresh: true,
                end: '+=600%',
                // markers: true,
              },
            });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: this.$refs.containerRef,
                        start: 'top top',
                        pin: this.$refs.containerRef,
                        pinSpacing: false,
                        id: 'first-pin',
                        scrub: 1,
                        end: '+=80%',
                        refreshPriority: 10,
                        // markers: true,
                    },
                });

                console.log(
                    this.$refs.blackRef.getBoundingClientRect().y,
                    document.getElementById('blackContainer').getBoundingClientRect().y
                );

                gsap.timeline({
                    scrollTrigger: {
                        trigger: document.getElementById('blackContainer'),
                        start: 'top top',
                        pin: this.$refs.blackRef,
                        id: 'second-pin',
                        scrub: 1,
                        end: '+=320%',
                        refreshPriority: 8,
                        // markers: true,
                    },
                });

                const titleTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.$refs.appRef,
                        start: 'top top',
                        scrub: 1,
                        end: '+=50%',
                        refreshPriority: 7,
                        // markers: true,
                    },
                });

                titleTL.fromTo(
                    this.$refs.titleRef,
                    {
                        opacity: 0,
                        scale: 0.75,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                    }
                );
            
        }, this.$refs.appRef)
    },
    unmounted() {
        ctx.revert();
    }
}
</script>