import { Controller, Post, Get, Delete, Body } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  
  constructor(
    private postService: PostService
  ){}
  
  @Post()
  cratePost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }
  
  @Get()
  getPosts() {
    return this.postService.getPosts()
  }
}
