const query = require('../utils/query')

// 新增商品
exports.insert = (values) => {
  let _sql = 'insert into commodity set name=?,brief=?,original_price=?,resale_price=?,edit_date=?,create_date=?,status=0'
  return query(_sql, values)
}

// 删除商品
exports.delete = (id) => {
  let _sql = 'update commodity set status=1 where id=?'
  return query(_sql, id)
}

// 修改商品
exports.update = (values) => {
  let _sql = 'update commodity set name=?,brief=?,original_price=?,resale_price=?,edit_date=? where id=?'
  return query(_sql, values)
}

// 查找商品根据id
exports.find = (id) => {
  let _sql = 'select * from commodity where id=?'
  return query(_sql, id)
}

// 获取商品列表分页
exports.all = (currentPage, pageSize) => {
  let _sql = `select * from commodity where status=0 order by create_date desc limit ${(currentPage - 1) * pageSize}, ${currentPage * pageSize}`
  console.log(_sql)
  return query(_sql)
}

// 获取总条数
exports.count = () => {
  let _sql = `select count(*) as count from commodity where status=0`
  return query(_sql)
}
