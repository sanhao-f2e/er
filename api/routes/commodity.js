const router = require('koa-router')()
const db = require('../db/commodity')
const moment = require('moment')

router.prefix('/commodity')

router.get('/list', async (ctx, next) => {
  let { currentPage, pageSize } = ctx.query
  currentPage = currentPage || 1
  pageSize = pageSize || 10
  let data, total
  await db.count().then(res => {
    total = res[0].count
  })

  await db.all(currentPage, pageSize).then(res => {
    data = res
  })

  ctx.body = {
    list: data,
    pagination: {
      total: total,
      pageSize: +pageSize,
      current: +currentPage,
    }
  }
})

router.post('/add', async (ctx, next) => {
  let { name, brief, original_price, resale_price } = ctx.request.body
  let timeStamp = parseInt((+ new Date) / 1000)

  await db.insert([
    name,
    brief,
    original_price,
    resale_price,
    timeStamp,
    timeStamp,
  ]).then(res => {
    ctx.body = {
      code: 200,
      message: '用户添加成功'
    }
  })

})

router.post('/delete', async (ctx, next) => {
  let { id } = ctx.request.body
  await db.delete([id]).then(res => {
    ctx.body = {
      code: 200,
      message: '删除成功'
    }
  })
})

router.post('/update', async (ctx, next) => {
  let { name, brief, original_price, resale_price, id } = ctx.request.body
  let timeStamp = parseInt((+ new Date) / 1000)

  await db.update([name, brief, original_price, resale_price, timeStamp, id]).then(res => {
    ctx.body = {
      code: 200,
      message: '编辑成功'
    }
  })
})

module.exports = router