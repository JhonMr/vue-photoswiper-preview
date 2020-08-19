<template>
  <div id="app">
    <div><a class="link" @click="actionPreview">show preview</a></div>

    <br>

    <img v-perview="1" :src="images[0]" />
    <img v-perview="1" :src="images[1]" />
  </div>
</template>
<script>
  import { preview } from '../src/install';
  export default {
    name: 'Home',
    components: {

    },
    data() {
      return {
        images: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597576404846&di=adc1ed7d2364657f4103a512515b0171&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F8057392277%2F1000',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3609936045,1071990311&fm=26&gp=0.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597768838280&di=ee5ecb80eddd2a1c40ce688c2dc28821&imgtype=0&src=http%3A%2F%2Fdingyue.ws.126.net%2F2019%2F04%2F11%2Fa0fc9e78c3104b1999e61b3dca131864.jpeg',
        ],
        changeSrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1650793918,2971157994&fm=26&gp=0.jpg',
      }
    },
    methods: {
      actionPreview() {
        const perviewInstance = preview(this.images, {index: 1});
        let photoswipe
        perviewInstance
            .then(v=>{
              photoswipe = v.photoswipe;
              return new Promise(resolve => {
                const img = new Image();
                img.onload = ()=>{
                  resolve({ src: img.src, w: img.width, h:img.height })
                }
                img.src = this.changeSrc;
              })
            })
            .then(obj=>{
              photoswipe.items.splice(1, 1, obj);
              photoswipe.invalidateCurrItems();
              photoswipe.updateSize(true);
            })
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
