import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import {CreateUserDto} from './dto/create-user.dto'


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  getUser(id: number) {
    return this.usersRepository.findOne({ 
      where: {id} });
  }
  
  createUser(user: CreateUserDto){
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser)
  }

  deleteUser(id: number) {
    return this.usersRepository.delete({id});
  }
}

