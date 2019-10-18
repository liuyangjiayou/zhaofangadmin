import axios from 'axios'
import qs from  'qs'
axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.baseURL = 'http://zhaofang.ok.wang/index/index/httprequest';

//发送请求的时候的一个拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('zfToken'); 
  let Uid = localStorage.getItem('zfUid');
  console.log(token);
  config.headers = {
    'Content-Type':'application/x-www-form-urlencoded', //设置跨域头部'
    'authorization' : token,
    'uid' : Uid ? Uid : '',
  };
  //url 路径传参
  return config
},function (err) {
  return Promise.reject(err);
});
//接受响应的一个拦截器
axios.interceptors.response.use(function (res) {
  /* 存储token */
  if(res.data.errcode == 0 && res.headers.authorization){
    let token = res.headers.authorization
    localStorage.setItem('zfToken',token);
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
    axios.post(url, qs.stringify(data))
      .then(res => {
        resolve(res);
      }, err => {
        reject(err);
    })
  })
}
