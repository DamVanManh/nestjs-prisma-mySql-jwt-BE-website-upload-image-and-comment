import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { HinhanhService } from './hinhanh.service';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { hinh_anh } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { InfoHinhAnhVaNguoiTaoAnh } from './dto/info-hinhanh.sto';
import { Request } from 'express';
import { CreateHinhAnhDto } from './dto/create-hinhanh.dto';

@UseGuards(AuthGuard("jwt"))
@Controller('hinhanh')
export class HinhanhController {
  constructor(private readonly hinhanhService: HinhanhService) { }

  @HttpCode(200)
  @Get('all')
  async getHinhAnhs(): Promise<ApiResponse<hinh_anh[] | string>> {
    return await this.hinhanhService.getHinhAnhs()
  }

  @HttpCode(200)
  @Get('name')
  async getHinhAnhByName(@Query("q") q: string): Promise<ApiResponse<hinh_anh[] | string>> {
    return await this.hinhanhService.getHinhAnhByName(q)
  }

  // GET thông tin ảnh và người tạo ảnh bằng id ảnh
  @HttpCode(200)
  @Get('info/hinh-id/:id')
  async getInfoHinhAnhVaNguoiTaoAnh(@Param("id") id: string): Promise<ApiResponse<InfoHinhAnhVaNguoiTaoAnh | string>> {
    return await this.hinhanhService.getInfoHinhAnhVaNguoiTaoAnh(id)
  }

  @HttpCode(200)
  @Get('user-id')
  async getHinhAnhsByNguoiDung(@Req() req: Request): Promise<ApiResponse<hinh_anh[] | string | null>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.hinhanhService.getHinhAnhsByNguoiDung(nguoiDungId)
  }

  @HttpCode(200)
  @Delete('delete/hinh-id/:hinhId')
  async xoaAnhbyHinhId(@Param("hinhId") hinhId: string, @Req() req: Request): Promise<ApiResponse<string>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.hinhanhService.xoaAnhbyHinhId(hinhId, nguoiDungId)
  }

  @HttpCode(201)
  @Post("create")
  async create(@Body() createBinhluanDto: CreateHinhAnhDto, @Req() req: Request): Promise<ApiResponse<hinh_anh | string>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.hinhanhService.create(createBinhluanDto, nguoiDungId);
  }
}
