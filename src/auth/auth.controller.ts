import { BadGatewayException, BadRequestException, Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-nguoidung.dto';
import { SignUpDto } from './dto/signup-nguoidung.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { nguoi_dung } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post("login")
  async login(@Body() body: LoginDto): Promise<ApiResponse<nguoi_dung | string>> {
    return await this.authService.login(body);
  }

  @HttpCode(201)
  @Post("signup")
  async signUp(@Body() body: SignUpDto): Promise<ApiResponse<nguoi_dung | string>> {
    return await this.authService.signUp(body);
  }

}
