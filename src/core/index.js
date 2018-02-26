const axios = require('axios')

/*
 * 自定义排行
 *
axios.request({
  method: 'get',
  baseURL: 'http://fund.eastmoney.com/data/',
  url: 'rankhandler.aspx',
  params: {
    op: 'dy',   // dy: 自定义， ph: 非自定义
    dt: 'kf',   // 类型 kf: 开放，hb: 货币 lc: 理财
    ft: 'all',  // all: 全部, gp: 股票型, hh: 混合型，zq: 债券型, zs: 指数型, bb: 保本型, qdii: qdii,
    rs: '',
    gs: 0,
    sc: 'qjzf',   // qjzf: 期间涨幅, zzf: 周涨幅, rzf: 日涨幅, 1yzf: 1月涨幅, jnzf: 今年涨幅, lnzf: 成立以来
    st: 'desc',
    sd: '2017-02-20',
    ed: '2018-02-20',
    es: 0,        // 1: 隐藏区间内成立的基金
    qdii: '',
    pi: 1,        // page index
    pn: 50,       // page number, 10000: 不分页
    dx: 1,
    // v: 0.6157239109480628  // 像是随机数
  }
}).then(result => {
  eval(result.data)
  console.log(rankData)
}).catch(err => {
  console.log(err)
})
*/

/*
 * 全部开放式基金净值
 *
*/
axios.request({
  method: 'get',
  baseURL: 'http://fund.eastmoney.com',
  url: '/Data/Fund_JJJZ_Data.aspx',
  params: {
    t: 1,
    lx: 0,
    letter: '',
    gsid: '',
    text: '',
    sort: 'zdf,desc',   // 日增长 降序
    // page: '1,200',      // 第1页 200条
    // dt: 1519093932025,  // 请求时间戳
    page: '30,200',
    dt: new Date().getTime(),
    atfc: '',
    onlySale: 0,        // 是否可购买 1: 可够 0: 全部
  }
}).then(result => {
  eval(result.data)
  // console.log(db)
  const datas = db && db.datas || []
  const all = {}
  datas.forEach(item => {
    all[item[0]] = {
      code: item[0],
      name: item[1],
    }
  })
  console.log(all)
  console.log(db.pages, db.record, db.datas.length)
}).catch(err => {
  console.log(err)
})


