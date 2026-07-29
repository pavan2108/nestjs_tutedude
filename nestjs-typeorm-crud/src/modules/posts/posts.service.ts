import { Inject, Injectable } from '@nestjs/common';
import { Post } from '../../models/post.entity';
import { Repository } from 'typeorm';
import { GetPostsDto } from './dto/get-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postRepository: Repository<Post>,
  ) {}

  async get(filter: GetPostsDto) {
    const queryBuilder = this.postRepository.createQueryBuilder('posts');

    queryBuilder.leftJoinAndSelect('posts.user', 'user');

    if (filter) {
      if (filter.title) {
        queryBuilder.where('posts.title = %:tltle$', { title: filter.title });
      }
    }
    return queryBuilder.getMany();
  }
}
