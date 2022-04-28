const fs = require('fs');

/**
 * 获取某个文件夹下所有的文件目录
 * @param{string} path - 文件夹绝对路径
 * @return{Object} obj - 文件名与文件的对象
 */

export default (path: string): Record<string, string> => {
  // 获取文件夹下的所有文件
  const files = fs.readdirSync(path);
  // 组成对象
  const obj: Record<string, string> = {};
  files.forEach((item: string) => {
    const key = '/' + item.split('.')[0];
    obj[key] = '/' + item;
  });
  return obj;
};
