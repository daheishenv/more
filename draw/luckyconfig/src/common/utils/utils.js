import dayjs from 'dayjs'
// 二开
// 内嵌后台, 获取iframe地址签名参数
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
          return pair[1];
      }
  }
  return (false);
}

// 时间格式化
function formatDate(date, type) {
    if (type === 'YMD') {
        return dayjs(date).format('YYYY-MM-DD')
    }
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export { getQueryVariable, formatDate }
