import { PREFIX_META,METHOD_META,URL_META } from './metadata'

import Router from 'koa-router'
import 'reflect-metadata'

// controller decorator
const Controller = (path:string = ''):ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PREFIX_META,path,target)
  }
}
// method decorator
const Method = (method:string) => (url:string):MethodDecorator => {
  return (target,key,descriptor) => {
    Reflect.defineMetadata(METHOD_META,method,descriptor.value)
    Reflect.defineMetadata(URL_META,url,descriptor.value)
  }
}

const Get = Method('get')
const Post = Method('post')
const Put = Method('put')
const Delete = Method('delete')
const Options = Method('options')
const Head = Method('head')
const Patch = Method('patch')

export { Controller,Get,Post,Put,Delete,Options,Head,Patch }
