/**Author:LJH,
 * Date: 2020/8/16
 * Description:
 *
 */
import functional from './index.js'

export const preview = functional;

const defaultOpts = {
  getThumbBoundsFns: function(el) {
    return function(index) {
      const thumbnail = el;
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      const rect = thumbnail.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top + pageYScroll,
        w: rect.width
      };
    }
  }
}
const imageGroup = {}
const vuePhotosPreview = {
  install(Vue, opts = {}) {
    Object.assign(opts, defaultOpts);
    Vue.directive('preview', {
      bind(el, {value}) {
        el.dataset.perview = value;
        if(!imageGroup[value]) imageGroup[value] = [];
        imageGroup[value].push(el.src);
      },
      unbind(el, {value}) {
        if(!imageGroup[value]) return ;
        const index = imageGroup[value].indexOf(el.src)
        index > -1 && imageGroup[value].splice(index, 1);
      }
    });
    document.addEventListener('click', function(e) {
      if(e.target.tagName.toUpperCase() == 'IMG' && e.target.dataset.perview !== undefined) {
        const images = imageGroup[e.target.dataset.perview];
        opts.index = images.indexOf(e.target.src);
        opts.getThumbBoundsFn = opts.getThumbBoundsFns(e.target);
        functional(images, opts)
      }
    }, false);
  }
}

export default vuePhotosPreview
