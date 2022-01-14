import { Controller,Get } from '@/decorator'

@Controller('/auth')
class Auth {
  @Get('/string')
  async getString(ctx){
    return {
      code: true,
      text: '/auth/string'
    }
  }
  @Get('/haha')
  async getPost(ctx){
    return '/auth/string => hello word'
  }
}

export default Auth
