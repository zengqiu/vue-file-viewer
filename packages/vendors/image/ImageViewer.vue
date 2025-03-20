<!--
 * @Author: zhanghan
 * @Date: 2023-01-09 15:04:10
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-11 19:01:17
 * @Descripttion: 渲染图片的容器
-->
<template>
  <viewer :images="images" class="image-container">
    <img
      v-for="item in images"
      alt="图片"
      :src="item.src"
      :key="item.index"
      class="image"
      @load="onImageLoad"
    />
  </viewer>
</template>

<script>
import EventBus from '../../util/EventBus'
import Vue from 'vue'
import viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(viewer)

export default {
  name: 'ImageViewer',
  props: {
    image: String
  },
  computed: {
    images() {
      return this.image ? [{ src: this.image }] : []
    },
  },
  methods: {
    onImageLoad() {
      // Emit custom event when image is fully loaded
      EventBus.$emit('fileLoaded', { fileType: 'image', success: true });
    }
  }
}
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  display: block;
  width: auto;
  height: auto;
  margin: auto;
  max-width: 100%;
  max-height: 100vh;
  object-fit: contain;
}
</style>
