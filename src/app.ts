import Koa from 'koa'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'

const app = new Koa()

import RegisterRouter from '@/register/router'

import Login from '@/routes/login'
import Auth from '@/routes/auth'

// app.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (error) {
//     const code = error.status || -1
//     ctx.body = {
//       message: error.message,
//       code
//     }
//   }
// })

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

new RegisterRouter(app,{
  controllers: [ Login,Auth ]
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export default app
