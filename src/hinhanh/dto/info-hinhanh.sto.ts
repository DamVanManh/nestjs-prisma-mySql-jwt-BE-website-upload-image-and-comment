import { hinh_anh } from '@prisma/client';
import { nguoi_dung } from '@prisma/client';
type NguoiDungInfo = Omit<nguoi_dung, 'mat_khau'>;

export interface InfoHinhAnhVaNguoiTaoAnh extends hinh_anh {
    nguoi_dung: NguoiDungInfo
}