import { Module } from '@nestjs/common';
import { LuuanhService } from './luuanh.service';
import { LuuanhController } from './luuanh.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [LuuanhController],
  providers: [LuuanhService],
})
export class LuuanhModule { }
