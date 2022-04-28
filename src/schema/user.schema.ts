import mongoose from 'mongoose';

export default new mongoose.Schema({
  clientType: Number, // 用户注册端 - 1: 微信小程序
  avatarUrl: String, // 头像
  nickName: String, // 昵称
  language: String, // 语言
  gender: String, // 性别
  cloudID: String, // 敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据
  encryptedData: String, // 包括敏感数据在内的完整用户信息的加密数据
  iv: String, // 加密算法的初始向量
  rawData: String, // 不包括敏感信息的原始数据字符串，用于计算签名
  signature: String, // 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
  openid: String, // 用户唯一标识
  sessionKey: String, // 会话id
  isEnabled: {type: Boolean, default: true}, // 是否可用
  createTime: {type: Date, default: Date.now()}, // 创建时间
});
