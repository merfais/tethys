const fs = require('fs')
const axios = require('axios')
const chalk = require('chalk')
const {
  resolve,
  request
} = require('./util.js')


function get(fundCode, pageIndex = 1, pageSize = 20) {
  return request({
    method: 'get',
    baseURL: 'http://api.fund.eastmoney.com',
    url: '/f10/lsjz',
    params: {
      callback: 'callback',
      fundCode,
      pageIndex,
      pageSize,
      startDate: '',
      endDate: '',
      // _: 1519836251090,
      _: new Date().getTime(),   // 请求时间戳
    },
    headers: {
      Referer: 'http://fund.eastmoney.com/'
    }
  }, res => {
    return new Promise(resolve => {
      const callback = data => {
        resolve(data)
      }
      eval(res.data)
    })
  })
}

let rows = 0
const all = {}

function genData(code, index, size = 200) {
  return get(code, index, size).then(data => {
    const list = data.Data && data.Data.LSJZList || []
    list.forEach(item => {
      // 压缩存储格式 => {code: name} 键值对
      all[item.FSRQ] = [
        item.DWJZ,
        item.LJJZ,
        item.FHFCZ,
      ]
    })
    const pageTotal = Math.ceil(data.TotalCount / size)
    rows += list.length
    console.log('请求结果 => { index: '
      + chalk.green(`${data.PageIndex}/${pageTotal}`)
      + `, rows: `+ chalk.green(`${rows}/${data.TotalCount}`) + ' }')
    // 启动链式请求，如果还有数据随机timeout后再次发起请求，否则退出
    return new Promise(resolve => {
      if (rows < data.TotalCount && data.PageIndex < pageTotal) {
        const timeout = Math.random() * 1000
        setTimeout(() => {
          resolve(genData(code, data.PageIndex + 1, size))
        }, timeout)
      } else {
        resolve()
      }
    })
  })
}

function write(code) {
  const fundsPath = resolve(`assets/data/funds_${code}.js`)
  genData(code).then(() => {
    console.log(chalk.green('write to file: ') + `${fundsPath}`)
    fs.writeFile(fundsPath, JSON.stringify(all), err => {
      if (err) {
        throw err
      }
      console.log(chalk.green('write success'))
    })
  }).catch(err => {
    console.log(chalk.red(err))
  })
}

write('110022')

/*
get('110022', 1, 1).then(data => console.log(JSON.stringify(data, null, 2)))

{
  "Data": {
    "LSJZList": [
      {
        "FSRQ": "2018-02-28",   // 净值日期
        "DWJZ": "2.3410",       // 单位净值
        "LJJZ": "2.3410",       // 累计净值
        "SDATE": null,
        "ACTUALSYI": "",
        "NAVTYPE": "1",
        "JZZZL": "-1.35",       // 日增长率
        "SGZT": "开放申购",     // 申购状态
        "SHZT": "开放赎回",     // 赎回状态
        "FHFCZ": "",            // 分红数
        "FHFCBZ": "",           //
        "DTYPE": null,
        "FHSP": ""              // 分红描述
      }
    ],
    "FundType": "001",
    "SYType": null
  },
  "ErrCode": 0,
  "ErrMsg": null,
  "TotalCount": 1805,
  "Expansion": null,
  "PageSize": 1,
  "PageIndex": 1
}
*/
