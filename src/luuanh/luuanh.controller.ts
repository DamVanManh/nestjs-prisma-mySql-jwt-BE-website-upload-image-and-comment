import { Controller, Get, Param, HttpCode, Req, UseGuards, Post, Body, Delete } from '@nestjs/common';
import { LuuanhService } from './luuanh.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { hinh_anh, luu_anh } from '@prisma/client';
import { CreateLuuanhDto } from './dto/create-luuanh.dto';
import { DeleteLuuanhDto } from './dto/delete-luuanh.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('luuanh')
export class LuuanhController {
  constructor(private readonly luuanhService: LuuanhService) { }

  @HttpCode(200)
  @Get('id-anh/:idAnh')
  async getInfoLuuHinh(@Param("idAnh") idAnh: string, @Req() req: Request): Promise<ApiResponse<luu_anh | string>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.luuanhService.getInfoLuuHinh(idAnh, nguoiDungId)
  }

  @HttpCode(200)
  @Get('')
  async getHinhAnhDaLuus(@Req() req: Request): Promise<ApiResponse<hinh_anh[] | string | null>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.luuanhService.getHinhAnhDaLuus(nguoiDungId)
  }

  @HttpCode(201)
  @Post()
  async luuAnh(@Body() createLuuanhDto: CreateLuuanhDto, @Req() req: Request): Promise<ApiResponse<luu_anh | string>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.luuanhService.luuAnh(createLuuanhDto, nguoiDungId)
  }

  @HttpCode(201)
  @Delete()
  async deleteLuuAnh(@Body() deleteLuuanhDto: DeleteLuuanhDto, @Req() req: Request): Promise<ApiResponse<string>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.luuanhService.deleteLuuAnh(deleteLuuanhDto, nguoiDungId)
  }
}
