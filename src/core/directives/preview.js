import Vue from 'vue';
import './preview.less';
const config = {
  isInitLoad: false,
  thumbEleInfo: {},
  fullEleInfo: {},
  eleDiffData: {},
};
const getFull = () => document.querySelector('.files-preview-container .wrapper .full');
const getContainerEle = () => document.querySelector('.files-preview-container');
/**
 * 初始化preview container
 * global范围内只会初始化一次
 */
const initial = () => {
  if (config.isInitLoad) {
    return;
  }
  const containerDiv = document.createElement('div');
  containerDiv.className = 'files-preview-container';
  containerDiv.style.cssText = 'display: none;visibility: hidden';
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'wrapper';
  const fullImg = document.createElement('img');
  // fullImg.addEventListener('click', closeFull);
  wrapperDiv.addEventListener('click', closeFull);
  fullImg.className = 'full';
  wrapperDiv.appendChild(fullImg);
  containerDiv.appendChild(wrapperDiv);
  document.body.appendChild(containerDiv);
  config.isInitLoad = true;
};
/**
 * 第一阶段render
 * 1. 计算natural与current尺寸比例，然后初始化css动画
 * 2. 设置src值并且设置load监听
 * 3. 计算位置差别，根据中心原点计算偏移量
 * @param thumbEle
 * @param onload
 */
const firstStageRender = function(thumbEle, onload) {
  // natural size
  const { naturalWidth, naturalHeight } = thumbEle;
  // 触发display
  toggleShow();
  const { width, height, x, y, src } = thumbEle;

  // 计算尺寸比例
  const scaleW = (width / naturalWidth).toFixed(3) - 0;
  const scaleH = (height / naturalHeight).toFixed(3) - 0;

  // 设置onload事件，用回回调
  // 保证设置src在onload之后，
  // 避免有些情况无法触发onload事件
  const fullEle = getFull();
  fullEle.onload = onload;
  fullEle.src = src;

  // 计算中心原点的偏移量
  config.eleDiffData = {
    x: -((document.documentElement.clientWidth - width) / 2 - x),
    y: -((document.documentElement.clientHeight - height) / 2 - y),
  };

  // 初始化css动画
  fullEle.style.cssText = `
     transition: none;
     transform: scale(${scaleW}, ${scaleH}) translate(${config.eleDiffData.x / scaleW}px, ${config
    .eleDiffData.y / scaleH}px);
  `;
  // thumbEle.style.visibility = 'hidden';
};
/**
 * 最后阶段render
 * 1. 复位动画
 */
const lastStageRender = function() {
  const fullEle = getFull();
  fullEle.style.cssText = `
    transform: translate(5px, 5px);
    transition: all 0.4s ease-out 0s;
  `;
};
/**
 * toggle container display
 */
const toggleShow = function() {
  const containerEle = getContainerEle();
  containerEle.style.display = containerEle.style.display === 'none' ? 'block' : 'none';
};
/**
 * toggle container visibility
 */
const toggleHidden = function() {
  const containerEle = getContainerEle();
  containerEle.style.visibility = containerEle.style.visibility === 'hidden' ? 'visible' : 'hidden';
};
/**
 * 关闭显示
 */
const closeFull = function() {
  toggleHidden();
  toggleShow();
  // config.thumbEle.style.visibility = 'visible';
};
/**
 * img点击事件
 * 1. 可以设置多个阶段，每个阶段设置自己需要的事情，目前只包含俩个阶段
 */
const click = function() {
  config.thumbEle = this;
  firstStageRender(this, () => {
    toggleHidden();
    lastStageRender();
  });
};

const preview = Vue.directive('preview', {
  bind(el) {
    initial();
    el.className = `${el.className} img_cursor`;
    config.thumbEle = el;
    el.addEventListener('click', click);
  },
});
export default preview;
