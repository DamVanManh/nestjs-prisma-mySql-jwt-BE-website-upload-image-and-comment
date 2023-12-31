import { Injectable } from '@nestjs/common';
import { binh_luan } from '@prisma/client';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBinhluanDto } from './dto/create-binhluan.dto';

@Injectable()
export class BinhluanService {
  constructor(private prismaService: PrismaService) { }
  async getByIdAnh(id: string): Promise<ApiResponse<binh_luan[] | string>> {
    try {

      let data = await this.prismaService.binh_luan.findMany({
        where: {
          hinh_id: parseFloat(id)
        }

      })
      if (!data.length) {
        ResponseHelper.error("Không tồn tại id hình")
      }
      return ResponseHelper.success(data)
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

  async binhLuan(createBinhluanDto: CreateBinhluanDto, nguoiDungId: string): Promise<ApiResponse<binh_luan | string>> {
    try {
      const hinh = await this.prismaService.hinh_anh.findUnique({
        where: {
          hinh_id: createBinhluanDto.hinhId,
        },
      });

      if (!hinh) {
        ResponseHelper.error("Không tồn tại hình")
      }

      let binhLuan = {
        ngay_binh_luan: new Date(),
        noi_dung: createBinhluanDto.noiDung,
        nguoi_dung_id: parseFloat(nguoiDungId),
        hinh_id: createBinhluanDto.hinhId,
      }
      const newBinhLuan = await this.prismaService.binh_luan.create({ data: binhLuan });
      return ResponseHelper.success(newBinhLuan)
    } catch (error) {
      if (error?.status && error?.status != 500)
        ResponseHelper.error(error.message, error.status);
      ResponseHelper.internalError();
    }
  }

}
