import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
