import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsDto } from './dto/get-posts.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  get(@Query() filter: GetPostsDto) {
    return this.postService.get(filter);
  }
}
