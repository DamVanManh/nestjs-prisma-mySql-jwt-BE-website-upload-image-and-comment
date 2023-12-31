import { PartialType } from '@nestjs/mapped-types';
import { CreateBinhluanDto } from './create-binhluan.dto';

export class UpdateBinhluanDto extends PartialType(CreateBinhluanDto) {}
