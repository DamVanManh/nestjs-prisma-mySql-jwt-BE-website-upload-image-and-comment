import { Module } from '@nestjs/common';
import { NguoidungService } from './nguoidung.service';
import { NguoidungController } from './nguoidung.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NguoidungController,],
  providers: [NguoidungService],
})
export class NguoidungModule { }
