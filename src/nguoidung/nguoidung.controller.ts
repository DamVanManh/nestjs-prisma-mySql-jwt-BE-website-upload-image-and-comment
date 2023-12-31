import { Controller, Get, Req, UseGuards, Put, Body } from '@nestjs/common';
import { NguoidungService } from './nguoidung.service';
import { nguoi_dung } from '@prisma/client';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateNguoiDungDto } from './dto/update-nguoidung.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('nguoidung')
export class NguoidungController {
  constructor(private readonly nguoidungService: NguoidungService) { }

  @Get("info")
  async getInfo(@Req() req: Request): Promise<ApiResponse<nguoi_dung | string>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.nguoidungService.getInfo(nguoiDungId);
  }

  @Put("update")
  async update(@Body() updateNguoiDungDto: UpdateNguoiDungDto, @Req() req: Request): Promise<ApiResponse<nguoi_dung | string>> {
    let nguoiDungId = req.user['nguoi_dung_id'];
    return await this.nguoidungService.update(updateNguoiDungDto, nguoiDungId);
  }
}
