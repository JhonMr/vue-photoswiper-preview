/*
* Author: LJH
* Date: 2020/8/10
* Description:
*/
import Preview from './preview/index.js'
import loadingImg from './assets/loading_small.gif'
// promise 拓展
function allSettled(promises) {
  const wrapped = promises.map(
    (p) => Promise.resolve(p)
      .then((val) => ({ status: 'fulfilled', value: val }), (err) => ({ status: 'rejected', reason: err })),
  );
  return Promise.all(wrapped);
}

/* async、await中间转换函数
 *@param promise
 * */
export function to(promises) {
  if (promises && promises.then) {
    return promises
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
  return [null, promises];
}

function proxyImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function (event) {
      resolve(image);
    };
    image.onerror = function (err) {
      reject(err);
    };
    image.src = url;
  });
}


export default async function preview(images, opts, Vue) {
  const instance = Preview(opts, Vue);
  let [_, loadingImage] = await to(proxyImage(loadingImg));
  if (loadingImage) {
    loadingImage.w = loadingImage.width;
    loadingImage.h = loadingImage.height;
  }
  instance.view([loadingImage || new Image()]);
  const promises = [];
  images = images.map((item) => {
    if (typeof item == 'string') item = { src: item };
    if (!item.w || !item.h) {
      promises.push(proxyImage(item.src));
    }
    else promises.push(null);
    return item;
  });
  const result = await allSettled(promises);
  result.map((item, i) => {
    if (item) {
      let w = 100; let
        h = 100;
      if (item.status == 'fulfilled') {
        w = item.value.width;
        h = item.value.height;
      }
      images[i].w = w;
      images[i].h = h;
    }
  });
  instance.photoswipe.items.splice(0, 1, ...images);
  instance.photoswipe.updateSize(true);
  return instance;
}
