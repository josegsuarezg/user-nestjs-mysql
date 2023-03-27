import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  
  constructor(private usersService: UsersService) {}
  
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
  
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }
  
  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.createUser(newUser)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number){
  return this.usersService.deleteUser(id)}

}
