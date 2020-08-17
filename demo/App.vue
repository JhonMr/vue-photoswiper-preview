<template>
  <div id="app">
    <div><a class="link" @click="actionPreview">show preview</a></div>

    <br>

    <img v-perview="1" :src="images[0]" />
    <img v-perview="1" :src="images[1]" />
  </div>
</template>
<script>
  import preview from '../src/index';
  export default {
    name: 'Home',
    components: {

    },
    data() {
      return {
        images: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597576404846&di=adc1ed7d2364657f4103a512515b0171&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F8057392277%2F1000',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597554504662&di=fb07d6261ec048652878434fd1f582aa&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D2268908537%2C2815455140%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D719',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597554548235&di=bd2963d9c0283d5927fe4ef43346d47f&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D2266751744%2C4253267866%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D854',
        ],
      }
    },
    methods: {
      actionPreview() {
        preview(this.images, {index: 1});
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
