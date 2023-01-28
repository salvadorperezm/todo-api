import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async etProfile(@Request() request) {
    return request.user;
  }
}
