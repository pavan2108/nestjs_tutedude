import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: configService.getOrThrow('app.database_url'),
        entities: [__dirname + '/../../models/**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: false,
      });

      return dataSource.initialize();
    },
  },
];
