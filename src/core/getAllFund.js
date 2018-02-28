const fs = require('fs')
const axios = require('axios')
const chalk = require('chalk')
const {
  resolve,
  request
} = require('./util.js')

function get(page, count = 200, onlySale = 0) {
  return request({
    method: 'get',
    baseURL: 'http://fund.eastmoney.com',
    url: '/Data/Fund_JJJZ_Data.aspx',
    params: {
      t: 1,
      lx: 0,
      letter: '',
      gsid: '',
      text: '',
      sort: 'bzdm,asc',   // bzdm: 基金代码 zdf: 日增长 降序
      page: `${page},${count}`,        // 第1页 200条
      dt: new Date().getTime(),   // 请求时间戳
      atfc: '',
      onlySale,        // 是否可购买 1: 可购 0: 全部
    }
  }, res => {
    eval(res.data)
    return db || {}
  })
}


let pageTotal = 40
let receiveRows = 0
const all = {}

function genData(index = 1, count = 200) {
  return get(index, count).then(data => {
    const rowTotal = data.record
    const list = data.datas || []
    list.forEach(item => {
      // 压缩存储格式 => {code: name} 键值对
      all[item[0]] = item[1]
    })
    pageTotal = data.pages
    receiveRows += list.length
    console.log('请求结果 => { index: ' + chalk.green(`${index}/${pageTotal}`) +
      `, rows: `+ chalk.green(`${receiveRows}/${rowTotal}`) + ' }')
    // 启动链式请求，如果还有数据随机timeout后再次发起请求，否则退出
    return new Promise(resolve => {
      if (receiveRows < rowTotal && index < pageTotal) {
        index += 1
        const timeout = Math.random() * 1000
        setTimeout(() => {
          resolve(genData(index, count))
        }, timeout)
      } else {
        resolve()
      }
    })
  })
}

function write() {
  const fundsPath = resolve('assets/data/funds.js')
  genData().then(() => {
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

write()

/*
get(11, 1).then(data => console.log(data))

{
  chars: ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'],
  datas: [[
    '000001',
    '华夏成长'
    'HXCZ',
    '1.1210',
    '3.5320',
    '1.1270',
    '3.5380',
    '-0.0060',
    '-0.53',
    '开放申购',
    '开放赎回',
    '',
    '1',
    '0',
    '1',
    '',
    '1',
    '0.15%',
    '0.15%',
    '1',
    '1.50%'
  ]],
  count: ['5071', '1517', '751', '2803'],
  record: '5876',
  pages: '5876',
  curpage: '1',
  indexsy: [-0.99, -0.87, 0.2],
  showday: ['2018-02-28', '2018-02-27']
}
*/
