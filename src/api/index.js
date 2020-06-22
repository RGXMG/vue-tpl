/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 11:09
 * 添加拦截器并导出所有API
 */
import { useRequestInterceptor, useResponseInterceptor } from '@bf/request';
import { createRequestInterceptorMiddleware } from './interceptor';
import * as base from './base';
export { base };

// 使用request interceptor
useRequestInterceptor(req => createRequestInterceptorMiddleware(req));

// 使用response interceptor
useResponseInterceptor(res => {
  console.log('res:::', res);
  return res.data;
});
