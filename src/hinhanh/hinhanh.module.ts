import { Module } from '@nestjs/common';
import { HinhanhService } from './hinhanh.service';
import { HinhanhController } from './hinhanh.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HinhanhController],
  providers: [HinhanhService],
})
export class HinhanhModule { }
