// const getPosition = (
//     timeout = 10000,
//     maximumAge = 60000, 
//     enableHighAcuracy = false) => new Promise((resolve, reject) => {
//     if (!navigator && !navigator.geolocation)  {
//       return reject(new Error('geolocation api not supported'))
//     } 
//     const success = (loc) => {
//         const location = {
//           latitude: loc.coords.latitude,  // 纬度
//           longitude: loc.coords.longitude,  // 经度
//           accuracy: loc.coords.accuracy // 精确度
//         }
//         resolve(location)
//     }
//     const error = () => reject('出错了')
//     navigator.geolocation.getCurrentPosition(success, error, {
//       enableHighAcuracy,  // 指示浏览器获取高精度的位置，默认为false
//       timeout,  // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
//       maximumAge // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
//     })
//   })
//   // 使用示例
//   // getPosition()
//   // .then(pos => alert(JSON.stringify(pos)))
//   // .catch(err => alert(JSON.stringify(err)))
//   export default getPosition;
export function MP(ak) {
  return new Promise(function (resolve, reject) {
      window.onload = function () {
          resolve(BMap)
      }
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://api.map.baidu.com/api?v=2.0&ak=DD279b2a90afdf0ae7a3796787a0742e&callback=init";
      // script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
      script.onerror = reject;
      document.head.appendChild(script);
  })
}
