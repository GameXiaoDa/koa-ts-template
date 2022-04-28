import Router from '@koa/router';
import * as controller from '../controller/goods';
const router = new Router({sensitive: true});

router.get('/list', controller.list); // 用户列表

export default router;
