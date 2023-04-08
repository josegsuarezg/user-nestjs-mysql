import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
  
  constructor(private usersService: UsersService) {}
  
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
  
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User | HttpException> {
    return this.usersService.getUser(id);
  }
  
  @Post()
  createUser(@Body() newUser: CreateUserDto) : Promise<User | HttpException>{
    return this.usersService.createUser(newUser)
  }
  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise <HttpException | (User & UpdateUserDto)> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.deleteUser(id)}
  
  @Post(':id/profile')
  createProfile(@Param('id', ParseIntPipe) id:number, @Body() profile: CreateProfileDto) {
    return this.usersService.createProfile(id, profile)
  }

}
