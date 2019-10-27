import axios from 'axios'
import qs from  'qs'
import Vue from 'vue';
import { isRegExp } from 'util';
axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.baseURL = 'http://zhaofang.ok.wang/index/index/httprequest';

//发送请求的时候的一个拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('zfToken'); 
  //url 路径传参
  return config
},function (err) {
  return Promise.reject(err);
});
//接受响应的一个拦截器
axios.interceptors.response.use(function (res) {
  if(res.data.token){localStorage.setItem('zfToken',JSON.stringify(res.data.token))}
  if(res.code == 0){
    Vue.$message({
      type : 'error',
      message : res.msg,
      duration : 2000,
    });
  }
  return res.data
},function (err) {
  return Promise.reject(err);
});

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        resolve(res);
      }, err => {
        reject(err);
    })
  })
}
