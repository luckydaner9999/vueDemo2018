import util from './util'
const {
  request
}
= util;
export const Login=(data,callback)=>{
    request(`/login`,data,callback,'post')
}
