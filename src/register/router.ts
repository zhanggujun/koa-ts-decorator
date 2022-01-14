import Koa from 'koa'
import KoaRouter from 'koa-router'

import 'reflect-metadata'

import { PREFIX_META,METHOD_META,URL_META } from '@/decorator/metadata'

interface IControllers{
  controllers: any[]
}

class RegisterRouter{
  private app:Koa
  private controllers:any[]
  constructor(app:Koa,{
    controllers
  }:IControllers){
    this.app = app
    this.controllers = controllers
    this.register()
  }
  register(){
    const router:KoaRouter = new KoaRouter()
    const ControllerToRoute = this.ControllerToRouteFactory(router)
    this.controllers.forEach(ControllerToRoute)
  }
  ControllerToRouteFactory(router:KoaRouter){
    return Controller => {
      const factoryController = new Controller()
      const factoryPrototype = Object.getPrototypeOf(factoryController)
      const filter = (method:string | number | symbol):boolean => ((method !== 'constructor') && typeof factoryPrototype[method] === 'function')
      const factoryMethods:(string | number | symbol)[] = Object.getOwnPropertyNames(factoryPrototype).filter(method => filter(method))
      const path:string | number = Reflect.getMetadata(PREFIX_META,Controller)
      factoryMethods.forEach(factoryMethod => {
        const fn:Function = factoryPrototype[factoryMethod]
        const url:string | number = Reflect.getMetadata(URL_META,fn)
        const method:string = Reflect.getMetadata(METHOD_META,fn)
        const uri:string = path ? `${ path }${ url }` : `${ url }`
        router[method](uri,async ctx => {
          const data = await fn(ctx)
          ctx.status = 200
          ctx.body = { code: 200,data }
        })
      })
      this.app.use(router.routes())
    }
  }
}

export default RegisterRouter
