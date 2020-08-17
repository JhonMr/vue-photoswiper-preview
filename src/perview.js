/*
* Author: LJH
* Date: 2020/8/6
* Description:
*/

import Vue from 'vue';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import PreviewComponent from './perview.vue';

const defaultOptions = {
  addCaptionHTMLFn(item, captionEl, isFake) {
    if (!item.title) {
      captionEl.children[0].innerText = '';
      return false;
    }
    captionEl.children[0].innerHTML = item.title;
    return true;
  },
  showHideOpacity: true,
  history: false,
  shareEl: false,
  maxSpreadZoom: 3,
  getDoubleTapZoom(isMouseClick, item) {
    if (isMouseClick) {
      return 1.5;
    }
    return item.initialZoomLevel < 0.7 ? 1 : 1.5;
  },
};
let instance;
const Constructor = Vue.extend(PreviewComponent);
Constructor.prototype.view = function (imgs) {
  this.openPhotoSwipe(imgs);
};
Constructor.prototype.openPhotoSwipe = function (images) {
  const pswpElement = document.querySelector('.pswp');
  const options = this.$options.option;
  Object.assign(options, defaultOptions);
  const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, images, options);
  this.photoswipe = gallery;
  gallery.init();
};
Constructor.prototype.doDestory = function () {
  const vm = this;
  setTimeout(() => {
    if (vm.$el && vm.$el.parentNode) vm.$el.parentNode.removeChild(vm.$el);
    vm.$destory();
  }, 500);
};
Constructor.prototype.close = function() {
  this.photoswipe.close();
}
Constructor.prototype.destroy = function() {
  this.photoswipe.destroy();
  this.doDestory();
}

const VuePreview = function (opts) {
  opts = opts || {};
  if(!instance) {
    const parent = document.body;
    const instance = new Constructor({
      el: document.createElement('div'),
      option: opts,
    });
    parent.appendChild(instance.$el);
  }
  return instance;
};

export default VuePreview;
