import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostModule } from './post.module';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }
  // 1. GET/post

  @Get()
  getPosts() {
    return this.postService.getAllPost();
  }

  // 2. GET /post/:id

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPostById(+id)
  }

  // 3. POST /post/:id

  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postService.createPost(author, title, content);
  }

  // 4. Patch /post/:id

  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postService.updatePost(+id, author, title, content)
  }

  // 5. DELETE /post/:id

  @Delete(':id')
  deletePost(
    @Param('id') id: string
  ) {
    return this.postService.deletePost(+id)
  }
}
