/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/20
 * Time: 10:16
 *
 */
import Vue from 'vue';
import SvgIcon from '@/components/UI/SvgIcon';

// register globally
Vue.component('svg-icon', SvgIcon);

// use webpack method load all svg file
const req = require.context('@icons/svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
