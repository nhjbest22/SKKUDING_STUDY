import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 2. .env 파일을 읽도록 모듈 설정
      isGlobal: true, // 3. 앱 전역에서 환경 변수를 사용할 수 있게 설정
    }),
    PrismaModule, // PrismaModule 이전에 ConfigModule이 로드되어야 합니다.
    RestaurantsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
