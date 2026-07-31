import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './helpers/logger/logger.module';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { TasksModule } from './modules/tasks/tasks.module';
import appConfig from './config/environment/app.config';
import { AuthGuard } from './helpers/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    JwtModule.registerAsync({
      global: true, // Retains your global module configuration
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('app.jwt_secret'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
    LoggerModule,
    DatabaseModule,
    UserModule,
    TasksModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
