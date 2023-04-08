import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  
  constructor(
    @InjectRepository(Post) 
    private postRepository: Repository<Post>,
    private usersService: UsersService,
  ){}
  
  async createPost(post: CreatePostDto){
    const userFound = await this.usersService.getUser(post.authorId);
    
    if(!userFound) 
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    
    const newPost = this.postRepository.create(post)
    return this.postRepository.save(newPost)
  }
  
  getPosts() {
    return this.postRepository.find({relations: ['author']});
  }
  
  
}
