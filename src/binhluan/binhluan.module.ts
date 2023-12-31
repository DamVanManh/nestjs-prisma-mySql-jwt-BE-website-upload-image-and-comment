import { Module } from '@nestjs/common';
import { BinhluanService } from './binhluan.service';
import { BinhluanController } from './binhluan.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BinhluanController],
  providers: [BinhluanService],
})
export class BinhluanModule { }
