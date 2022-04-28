import * as crypto from 'crypto';

interface Options {
  appKey: string;
  appSecret: string;
}

class TbFetchUtil {
  private appKey: string;
  private appSecret: string;
  constructor(options: Options) {
    if (!options.appKey || !options.appSecret) {
      throw new Error('appKey or appSecret need!');
    }
    this.appKey = options.appKey;
    this.appSecret = options.appSecret;
  }

  generateParams(obj: Record<string, any>, method: string): Record<string, any> {
    const props: any = {
      app_key: this.appKey,
      sign_method: 'md5',
      format: 'json',
      v: '2.0',
      timestamp: this.YYYYMMDDHHmmss(),
      method,
      ...obj,
    };
    const sortStr = this.sortObjectToStr(props);
    props.sign = this.sign(sortStr).toUpperCase();
    return props;
  }

  /**
   * 参数对象排序组成字符串
   * @param obj - 参数
   */
  private sortObjectToStr(obj: Record<string, any>) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        obj[key] = JSON.stringify(obj[key]);
      } else {
        obj[key] = obj[key];
      }
    }

    let str: string = this.appSecret;
    Object.keys(obj)
      .sort()
      .forEach(key => {
        str += `${key}${obj[key]}`;
      });
    str += this.appSecret;
    return str;
  }

  /**
   * 签名算法 - md5
   * @param s - 加密参数
   * @param format - 加密输出编码格式
   * @returns string
   */
  private sign(s: string, format: crypto.BinaryToTextEncoding = 'hex') {
    const sum = crypto.createHash('md5');
    const isBuffer = Buffer.isBuffer(s);
    sum.update(s, isBuffer ? 'binary' : 'utf8');
    return sum.digest(format);
  }

  /**
   * 获取当前时间
   * @param d
   * @param options
   * @returns
   */
  private YYYYMMDDHHmmss(d?: any, options?: {dateSep: string; timeSep: string}) {
    d = d || new Date();
    if (!(d instanceof Date)) {
      d = new Date(d);
    }

    let dateSep = '-';
    let timeSep = ':';
    if (options) {
      if (options.dateSep) {
        dateSep = options.dateSep;
      }
      if (options.timeSep) {
        timeSep = options.timeSep;
      }
    }
    let date = d.getDate();
    if (date < 10) {
      date = '0' + date;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let hours = d.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    let mintues = d.getMinutes();
    if (mintues < 10) {
      mintues = '0' + mintues;
    }
    let seconds = d.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return d.getFullYear() + dateSep + month + dateSep + date + ' ' + hours + timeSep + mintues + timeSep + seconds;
  }

  is(value: unknown) {
    return {
      a: function (check: any) {
        if (check.prototype) check = check.prototype.constructor.name;
        const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        return value != null && type === check.toLowerCase();
      },
    };
  }
}

export default TbFetchUtil;
