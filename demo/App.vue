<template>
  <div id="app">
    <div><a class="link pointer" @click="actionPreview">show preview</a></div>

    <br>

    <img v-preview="1" src="./image/test1.jpeg" />
    <img v-preview="1" src="./image/test4.jpeg" />
  </div>
</template>
<script>
import { preview } from '../src/index';
export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      images: [
        './demo/image/test3.jpeg',
        './demo/image/test2.jpeg',
      ],
      changeImageUrl: '',
    }
  },
  methods: {
    actionPreview() {
      const perviewInstance = preview(this.images, { index: 1 }, this.constructor);
      let photoswipe
      perviewInstance
        .then(v => {
          photoswipe = v.photoswipe;
          /* return new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
              resolve({ src: img.src, w: img.width, h: img.height })
            }
            img.src = changeImageUrl;
          }) */
        })
      /*  .then(obj => {
        photoswipe.items.splice(1, 1, obj);
        photoswipe.invalidateCurrItems();
        photoswipe.updateSize(true);
      }) */
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  width: 150px;
}
</style>
