# 分红再投资 期间收益率

```javascript
// R 收益率
// v2 结束日单位净值
// v0 起始日单位净值
// k 分红系数
// v2 * k 复权净值
R = (v2 * k - v0) / v0
// h1 分红日单位分红
// v1 分红日单位净值
k = 1 + h1 / v1
// 如果期间内多次分红，则k等于
// k = 1 + h1 / v1 + h2 / v2 + ... + hn / vn
```

# 现金分红 期间收益率

```javascript
// R 收益率
// L2 结束日累计净值
// L0 起始日累计净值
R = (L2 - L0) / L0
```