import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-nguoidung.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-nguoidung.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { nguoi_dung } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) { }

    async login(body: LoginDto): Promise<ApiResponse<nguoi_dung | string>> {
        try {
            const { email, matKhau } = body;
            let checkUser = await this.prismaService.nguoi_dung.findFirst({
                where: {
                    email: email
                }
            })

            if (checkUser) {

                if (matKhau === checkUser.mat_khau) {

                    let token = await this.jwtService.signAsync(
                        {
                            nguoi_dung_id: checkUser.nguoi_dung_id,
                        },
                        { expiresIn: this.configService.get('EXPIRE_TOKEN_TIME'), secret: this.configService.get('SECRET_TOKEN') }
                    );
                    return ResponseHelper.success(token, 'Login thành công')
                } else {
                    ResponseHelper.error('Mật khẩu không đúng', HttpStatus.UNAUTHORIZED);
                }
            } else {
                ResponseHelper.error('Email không đúng', HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            if (error?.status && error?.status != 500)
                ResponseHelper.error(error.message, error.status);
            ResponseHelper.internalError()
        }
    }




    async signUp(body: SignUpDto): Promise<ApiResponse<nguoi_dung | string>> {
        try {
            const { email, matKhau, hoTen, tuoi } = body;

            let checkUser = await this.prismaService.nguoi_dung.findFirst({
                where: {
                    email: email
                }
            })

            if (checkUser) {
                ResponseHelper.error('Email đã tồn tại', HttpStatus.BAD_REQUEST);
            }

            let newNguoiDung = {
                email, mat_khau: matKhau, ho_ten: hoTen, tuoi,
                anh_dai_dien: ''
            }

            const nguoiDung = await this.prismaService.nguoi_dung.create({ data: newNguoiDung });
            return ResponseHelper.success(nguoiDung, 'Đăng ký thành công')
        } catch (error) {
            if (error?.status && error?.status != 500)
                ResponseHelper.error(error.message, error.status);
            ResponseHelper.internalError()
        }


    }
}
