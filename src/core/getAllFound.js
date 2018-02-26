const axios = require('axios')
const chalk = require('chalk')

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
    const tmp = {}
    datas.forEach(item => {
      all[item[0]] = {
        code: item[0],
        name: item[1],
      }
      tmp[item[0]] = {
        code: item[0],
        name: item[1],
      }
    })
    console.log(tmp)
    pages = Math.ceil(data.record / count) + 2
    rows += datas.length
    index += 1
    console.log(chalk.green(`index: ${index}, rows: ${rows}, pages: ${pages}, record: ${data.record}`))
    return new Promise(resolve => {
      if (rows < record && index < pages) {
        const timeout = Math.random() * 1000
        console.log(chalk.green(`next fetch timeout: ${timeout}`))
        setTimeout(() => {
          resolve(genData(index, count))
        }, timeout)
      } else {
        resolve()
      }
    })
  })
}

genData().then(() => {
  console.log(chalk.green('fetch data success'))
})
