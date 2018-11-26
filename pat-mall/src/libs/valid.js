
export const validateuserFunc = (rule, value, callback) => {
    debugger
  if (!value) {
    return callback(new Error("请输入用户名"));
  } else if (!/^[a-zA-Z\d]+$/.test(value)) {
    return callback(new Error("请正确输入用户名"));
  } else {
    callback();
  }
}
export const notvalid = (rule, value, callback) => {
    debugger
  alert('不验证')
  callback();
}
