import axios from 'axios';
import iView from 'iview';
import Qs from 'qs';
export const baseUrl = envbaseUrl;
let util={};
util.request = (url, data, callback, type = "get") => {
    axios.create({
        baseURL: "/",
        timeout: 10000,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'token': 'abcdefg',
        }
    })({
        method: type,
        url: envbaseUrl + url,
        data: type === "get" ? null : Qs.stringify(data),
        params: (type === "get"||type === "delete") ? data : null,
    }).then((res) => {
        if (res && res.data) {
            if (res.data.success) {
                if (callback) {
                    if (typeof callback === "function")
                        callback(res.data);
                    if (typeof callback === "object")
                        callback.ok(res.data);
                }
            } else {
                if (res.data.errorCode === "1001") {
                    sessionStorage.removeItem('user');
                    store.commit("usersignin", {
                        token: ""
                    });
                    window.location.href = '/login';
                }
                if (callback && typeof callback === "object") {
                    callback.fail(res.data);
                }
                iView.Message.error({content:res.data.errorMessage,duration: 10});
            }
        } else {
            if(res.errorMessage)
                iView.Message.error(res.errorMessage);
            else
                iView.Message.error("网络错误，请刷新重试！");
        }
    }).catch(function (error) {
        console.log(error);
        iView.Message.error("网络错误，请刷新重试！");
    });
};
export default util;