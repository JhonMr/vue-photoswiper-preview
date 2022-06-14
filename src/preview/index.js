/*
* Author: LJH
* Date: 2020/8/6
* Description:
*/

import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import PreviewComponent from './index.vue';

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
let Constructor;
function init(Vue) {
  Constructor = Vue.extend(PreviewComponent);
  Constructor.prototype.view = function (imgs, options) {
    this.openPhotoSwipe(imgs, options);
  };
  Constructor.prototype.openPhotoSwipe = function (images, options = {}) {
    const pswpElement = document.querySelector('.pswp');
    const mergeOptions = Object.assign(options, this.options, defaultOptions);
    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, images, mergeOptions);
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
  Constructor.prototype.close = function () {
    this.photoswipe.close();
  }
  Constructor.prototype.destroy = function () {
    this.photoswipe.destroy();
    this.doDestory();
  }

}

const VuePreview = function (opts, Vue) {
  opts = opts || {};
  if (!Constructor) init(Vue);
  if (!instance) {
    const parent = document.body;
    instance = new Constructor({
      el: document.createElement('div'),
    });
    parent.appendChild(instance.$el);
  }
  instance.options = opts;
  return instance;
};

export default VuePreview;
