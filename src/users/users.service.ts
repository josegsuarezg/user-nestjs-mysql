import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './users.entity';
import {CreateUserDto} from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

  ) {}

  getUsers() : Promise<User[]> {
    return this.usersRepository.find({
      relations: ['posts', 'profile']
    });
  }

  async getUser(id: number) : Promise<User | HttpException> {
    const userFound = await this.usersRepository.findOne({ 
      where: {id},
      relations: ['posts'] });
      
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    
    return userFound;
  }
  
  async createUser(user: CreateUserDto): Promise<User | HttpException>  {
    const userFound = await this.usersRepository.findOne({
      where: {
        username : user.username
        }
      });
    
    if(userFound) {
      return new HttpException(`User ${user.username} already exists`, HttpStatus.CONFLICT);
    }
    
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser)
  }

  async updateUser( id: number, user: UpdateUserDto): Promise <HttpException | (User & UpdateUserDto)> {
    
    const userFound = await this.usersRepository.findOne({where:{id}});
    
    if(!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    
    const updateUser = Object.assign(userFound, user)
    
    return this.usersRepository.save(updateUser);
  }

  async deleteUser(id: number) : Promise<DeleteResult | HttpException> {
    const result = await this.usersRepository.delete({id});
    
    if(result.affected === 0) {
      return new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    
    return result;
    
  }
  
  async createProfile(id: number, profile: CreateProfileDto): Promise<HttpException | (Profile & User)> {
    const userFound = await this.usersRepository.findOne({where: {id}})
    
    if (!userFound) {
      return new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    }
    
    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    userFound.profile = savedProfile;
    
    return await this.usersRepository.save(savedProfile);
    
  }
}

