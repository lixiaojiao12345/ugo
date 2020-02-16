// 封装promise请求
// 每个请求 都需要一个url地址
// 根据情况， 还可以又一个data数据
function request (url, data) {
  // 为方便，可以将参数写成一个对象，然后再分别获取
  // 例如： 将参数设置为obj
  // let url = obj.url || ''
  // let method = obj.method || 'get'
  return new Promise(function (resolve, reject) {
    mpvue.request({
      url: url,
      data: data,
      success: function (info) {
        resolve(info.data)
      }
    })
  })
}

export default request
