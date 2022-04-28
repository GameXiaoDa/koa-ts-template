import * as path from 'path';
import Router from '@koa/router';
import findFileByDir from './findFileByDir';
import Koa from 'koa';
import logger from './logger';
import responseMiddle from '../middleware/response.middle';

export default async function (app: Koa) {
  /**
   * 路由配置
   */
  const router = new Router({
    prefix: '/api', // 前缀
    sensitive: true,
  });

  // 统一响应
  router.use(responseMiddle());

  /**
   * 注册各个路由
   */
  const routerDirPath = '../router';
  const routerObj = findFileByDir(path.resolve(__dirname, routerDirPath));

  // 批量注册多个路由
  await Promise.all(
    Object.keys(routerObj).map(async key => {
      const route = await import(routerDirPath + routerObj[key]).catch(err => {
        logger.error('获取每个模块的路由失败:' + err);
      });
      router.use(key, route.default.routes(), route.default.allowedMethods());
      return true;
    }),
  );

  app.use(router.routes());
  app.use(router.allowedMethods());
}
