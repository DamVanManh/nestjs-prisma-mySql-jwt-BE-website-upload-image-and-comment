import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NguoidungModule } from './nguoidung/nguoidung.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './stratery/jwt.strategy';
import { HinhanhModule } from './hinhanh/hinhanh.module';
import { BinhluanModule } from './binhluan/binhluan.module';
import { LuuanhModule } from './luuanh/luuanh.module';

@Module({
  imports: [AuthModule, NguoidungModule, ConfigModule.forRoot({
    isGlobal: true
  }), HinhanhModule, BinhluanModule, LuuanhModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }
