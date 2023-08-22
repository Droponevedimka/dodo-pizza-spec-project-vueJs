<template>
    <div ref='textRef' className='app__black--title'>
          <div ref='titleRef' className='app__black--title-item'>
            <div className='app__black--title-item--lines'>
              <p>Чтобы выбрать лучший ингредиент,</p>
              <p>наши шефы тестируют за год тысячи</p>
              <p>образцов, иногда выпекая</p>
              <p>по 50 тестовых пицц в день.</p>
            </div>
            <div className='app__black--title-item--lines'>
              <p>Когда шефы выбрали самый</p>
              <p>подходящий вкус, менеджеры</p>
              <p>по качеству продуктов составляют</p>
              <p>спецификацию. 25 страниц</p>
              <p>технических требований.</p>
            </div>
            <div className='app__black--title-item--lines'>
              <p>Показания приборов, толщина слайсов</p>
              <p>до десятых миллиметра</p>
              <p>и время приготовления</p>
              <p>с точностью до секунд.</p>
            </div>
            <div className='app__black--title-item--lines'>
              <p>Чтобы быть уверенными, что</p>
              <p>все требования спецификации</p>
              <p>соблюдаются, независимый аудитор</p>
              <p>проверяет весь производственный</p>
              <p>процесс.</p>
            </div>
            <div className='app__black--title-item--lines'>
              <p>А также проверяем, что поставщик</p>
              <p>действительно работает</p>
              <p>с обещанными производителями.</p>
              <p>Так мы знаем, откуда, например,</p>
              <p>приходит молоко для моцареллы.</p>
            </div>
          </div>
        </div>
</template>
<script>
    import './text-style.scss';
    import gsap from 'gsap';

    let ctx;

    export default {
        props: {
           
        },
        mounted() {
            ctx = gsap.context((self) => {
                const titleTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: document.getElementById('blackContainer'),
                        start: 'top center',
                        delay: 5,
                        scrub: 1,
                        end: '+=320%',
                        // markers: true,
                    },
                });

                const blocks = gsap.utils.toArray('.app__black--title-item--lines');

      

                blocks.forEach((div, i) => {
                    let p = gsap.utils.toArray('p', div);
                    titleTL.fromTo(
                        p,
                        {
                            autoAlpha: 0,
                            stagger: 0.2,
                        },
                        {
                            autoAlpha: 1,
                            stagger: 0.2,
                            ease: 'power1.in',
                        }
                    );
                    titleTL.to(p, {
                        display: i < blocks.length - 1 && 'none',
                    });
                });
                
            }, this.$refs.textRef)
        },
        unmounted() {
            ctx.revert();
        }
    }
</script>