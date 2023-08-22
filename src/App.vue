<template>
  <div v-if="isLoaded" ref="loaderRef" className="app__loader">0%</div>
  <router-view v-else />
</template>

<script>
import '@/assets/scss/App.scss';
import { loadingResouces } from '@/scripts/resouces.js';

export default {
  data() {
    return {
      isLoaded: true,
    };
  },
  methods: {
    changeContext(e) {
      this.isLoaded = false;
      this.$store.commit('changeMediaArray', e);
    },
  },
  created() {},
  mounted() {
    function isDownloadedImgs() {
      const checkWidth = window.innerWidth;

      switch (true) {
        case checkWidth > 1920:
          return '2048';
        case checkWidth > 1440:
          return '1920';
        case checkWidth > 1024:
          return '1440';
        case checkWidth > 920:
          return '1024';
        case checkWidth > 620:
          return '834';
      }
      return '360';
    }

    const correctSizeSecources = isDownloadedImgs();

    const checkWidthPage = window.innerWidth;
    let isTypeMob = false;

    if (checkWidthPage < 1024) {
      if (checkWidthPage < 620) {
        isTypeMob = 'mob';
      } else {
        isTypeMob = 'tab';
      }
    }

    let dataImages = [
      {
        path: isTypeMob
          ? `/sequence/${isTypeMob}/bluecheese/`
          : '/sequence/desktop/bluecheese/',
        name: isTypeMob ? `bluecheese-${isTypeMob}_` : 'bluecheese-24_',
        pad: 5,
        type: '.png',
        range: [0, 168],
        typeMedia: 'image',
      },
      {
        path: isTypeMob
          ? `/sequence/${isTypeMob}/halfmush/`
          : '/sequence/desktop/halfmush/',
        name: isTypeMob ? `halfmush-${isTypeMob}_` : 'halfmush-24_',
        pad: 5,
        type: '.png',
        range: [0, 167],
        typeMedia: 'image',
      },
      {
        path: isTypeMob
          ? `/sequence/${isTypeMob}/halftomato/`
          : '/sequence/desktop/halftomato/',
        name: isTypeMob ? `halftomato-${isTypeMob}_` : 'halftomato-24_',
        pad: 5,
        type: '.png',
        range: isTypeMob ? [0, 168] : [0, 210],
        typeMedia: 'image',
      },
      {
        path: `/sequence/${correctSizeSecources}/b-w-transition/`,
        name: `bw-transition-${correctSizeSecources}_`,
        pad: 5,
        type: '.jpg',
        range: [0, 47],
        typeMedia: 'image',
      },
      {
        path: '/video/',
        name: 'niti',
        type: '.webm',
        typeMedia: 'video',
      },
    ];

    let mediaArray = [];

    dataImages.forEach((e, index) => {
      mediaArray.push({ arraySrc: [], type: e.typeMedia });
      if (e.typeMedia == 'video') {
        mediaArray[index].arraySrc.push(`${e.path + e.name + e.type}`);
      } else {
        for (let i = e.range[0]; i <= e.range[1]; i++) {
          mediaArray[index].arraySrc.push(
            `${e.path}${e.name}${i.toString().padStart(5, '0')}${e.type}`
          );
        }
      }
    });

    loadingResouces(mediaArray, this.changeContext, this.$refs.loaderRef);
  },
};
</script>
