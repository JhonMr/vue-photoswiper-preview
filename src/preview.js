/*
* Author: LJH
* Date: 2020/8/10
* Description:
*/
import Preview from './preview/index.js'
// promise 拓展
function allSettled(promises) {
  const wrapped = promises.map(
    (p) => Promise.resolve(p)
      .then((val) => ({ status: 'fulfilled', value: val }), (err) => ({ status: 'rejected', reason: err })),
  );
  return Promise.all(wrapped);
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
  const instance = Preview(opts, Vue);
  instance.view(images);
  return instance;
}
