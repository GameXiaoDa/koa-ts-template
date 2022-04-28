import Koa from 'koa';
import logger from '../utils/logger';

function resTemp(code = 200, data = null, msg = '') {
  return {
    code,
    data,
    msg,
  };
}

export default () =>
  async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) => {
    try {
      const resData = await next();
      let res = resTemp(0, resData, '');
      if (!Array.isArray(resData) && resData !== null && typeof resData === 'object') {
        if (resData.hasOwnProperty('code') || resData.hasOwnProperty('data') || resData.hasOwnProperty('msg')) {
          res = resTemp(resData.code || 0, resData.data || null, resData.msg || '');
        }
      }
      logger.info('路由:', ctx.URL.pathname, ', 响应数据:', res);
      ctx.body = res;
    } catch (error) {
      logger.error('路由:', ctx.URL.pathname, ', 报错: ', error);
      ctx.body = resTemp(5, null, '系统错误');
    }
  };
