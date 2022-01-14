import { Controller,Get } from '@/decorator'

@Controller('/login')
class Login{
  @Get('/string')
  async getString(ctx){
    return {
      code: true,
      text: '/login/string'
    }
  }
  @Get('/haha')
  async getPost(ctx){
    return '/login/string => hello word'
  }
}

export default Login
