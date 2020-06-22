/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/22
 * Time: 14:22
 * 提供setting的帮助函数
 */
import defaultSettings from './settings.config';

function getPageTitle(title) {
  console.log('getPageTitle:::', title);
  if (title) {
    return `${title} - ${defaultSettings.title}`;
  }
  return `${defaultSettings.title}`;
}
export { getPageTitle };
