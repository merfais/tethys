const fs = require('fs')
const path = require('path')
const axios = require('axios')
const chalk = require('chalk')
const {
  fp,
} = require('./util.js')

function get(page, count = 200, onlySale = 0) {
  return axios.request({
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
  }).then(result => {
    eval(result.data)
    return db || {}
  }).catch(err => {
    console.log(chalk.red('request failed with errors.\n'))
    console.log(err)
    console.log(chalk,red('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'))
  })
}

let pages = 40
let rows = 0
const all = {}

function genData(index = 1, count = 200) {
  return get(index, count).then(data => {
    const record = data.record
    const datas = data.datas || []
    datas.forEach(item => {
      // 压缩存储格式 => {code: name} 键值对
      all[item[0]] = item[1]
    })
    pages = Math.ceil(data.record / count) + 2
    rows += datas.length
    index += 1
    console.log('请求结果 => { index: ' + chalk.green(`${index}/${pages}`) +
      `, rows: `+ chalk.green(`${rows}/${data.record}`) + ' }')
    // 启动链式请求，如果还有数据随机timeout后再次发起请求，否则退出
    return new Promise(resolve => {
      if (rows < record && index < pages) {
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
  const fundsPath = fp('assets/data/funds.js')
  genData().then(() => {
    console.log(chalk.green('write to file: ') + `${fundsPath}`)
    fs.writeFile(fundsPath, JSON.stringify(all), err => {
      console.timeEnd(1)
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

