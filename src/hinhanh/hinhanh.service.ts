import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hinh_anh } from '@prisma/client';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { PrismaService } from 'src/database/prisma.service';
import { InfoHinhAnhVaNguoiTaoAnh } from './dto/info-hinhanh.sto';
import { CreateHinhAnhDto } from './dto/create-hinhanh.dto';

@Injectable()
export class HinhanhService {
    constructor(private prismaService: PrismaService) { }
    async getHinhAnhs(): Promise<ApiResponse<hinh_anh[] | string>> {
        try {

            let data = await this.prismaService.hinh_anh.findMany();
            return ResponseHelper.success(data)
        } catch (error) {
            if (error?.status && error?.status != 500)
                ResponseHelper.error(error.message, error.status);
            ResponseHelper.internalError();
        }
    }

    async getHinhAnhByName(q: string): Promise<ApiResponse<hinh_anh[] | string>> {
        try {

            let data = await this.prismaService.hinh_anh.findMany({
                where: {
                    ten_hinh: {
                        contains: q
                    }
                }
            });
            return ResponseHelper.success(data)
        } catch (error) {
            if (error?.status && error?.status != 500)
                ResponseHelper.error(error.message, error.status);
            ResponseHelper.internalError();
        }
    }

    async getInfoHinhAnhVaNguoiTaoAnh(id: string): Promise<ApiResponse<InfoHinhAnhVaNguoiTaoAnh | string>> {
        try {

            let data = await this.prismaService.hinh_anh.findUnique({
                where: {
                    hinh_id: parseFloat(id)
                },
                include: {
                    nguoi_dung: {
                        select: {
                            email: true,
                            ho_ten: true,
                            tuoi: true,
                            anh_dai_dien: true,
                            nguoi_dung_id: true,
                        },
                    },
                },

            })
            if (!data) {
                ResponseHelper.error('Không tồn tại id ảnh')
            }
            return ResponseHelper.success(data)
        } catch (error) {
            if (error?.status && error?.status != 500)
                ResponseHelper.error(error.message, error.status);
            ResponseHelper.internalError();
        }
    }

    async getHinhAnhsByNguoiDung(nguoiDungId: number): Promise<ApiResponse<hinh_anh[] | string | null>> {
        try {

            let data = await this.prismaService.hinh_anh.findMany({
                where: {
                    nguoi_dung_id: nguoiDungId
                }
            });
            return ResponseHelper.success(data)
        } catch (error) {
            if (error?.status && error?.status != 500)
                ResponseHelper.error(error.message, error.status);
            ResponseHelper.internalError();
        }
    }

    async xoaAnhbyHinhId(hinhId: string, nguoiDungId: number): Promise<ApiResponse<string>> {
        try {
            let hinhanh = await this.prismaService.hinh_anh.findUnique({
                where: {
                    hinh_id: parseFloat(hinhId),
                    nguoi_dung_id: nguoiDungId
                }
            })

            if (!hinhanh) {
                ResponseHelper.error('Không thể xoá hình của user khác hoặc không tồn tại hình');
            }

            // xoá các record ở table khác có dùng hinh_id làm FK
            await this.prismaService.binh_luan.deleteMany({
                where: {
                    hinh_id: parseFloat(hinhId)
                }
            });
            await this.prismaService.luu_anh.deleteMany({
                where: {
                    hinh_id: parseFloat(hinhId)
                }
            });

            // xoá hình sau khi thảo mãn điều kiện
            await this.prismaService.hinh_anh.delete({
                where: {
                    hinh_id: parseFloat(hinhId)
                }
            });
            return ResponseHelper.success('')
        } catch (error) {
            if (error?.status && error?.status != 500)
                ResponseHelper.error(error.message, error.status);
            ResponseHelper.internalError();
        }
    }

    async create(createHinhAnhDto: CreateHinhAnhDto, nguoiDungId: number): Promise<ApiResponse<hinh_anh | string>> {
        try {

            let hinhAnh = {
                ...createHinhAnhDto,
                nguoi_dung_id: nguoiDungId
            }
            const newHinhAnh = await this.prismaService.hinh_anh.create({ data: hinhAnh });

            return ResponseHelper.success(newHinhAnh)
        } catch (error) {
            if (error?.status && error?.status != 500)
                ResponseHelper.error(error.message, error.status);
            ResponseHelper.internalError();
        }
    }
}

