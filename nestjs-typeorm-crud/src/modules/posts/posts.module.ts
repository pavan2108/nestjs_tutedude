import { Module } from '@nestjs/common';
import { Post } from 'src/models/post.entity';
import { DataSource } from 'typeorm';
import { PostController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostController],
  providers: [
    {
      provide: 'POST_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
      inject: ['DATA_SOURCE'],
    },
    PostsService,
  ],
})
export class PostsModule {}
