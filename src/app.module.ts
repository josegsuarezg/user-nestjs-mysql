import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './users/users.entity'
import { Profile } from './users/profile.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'entrar01',
      database: 'userdb',
      // entities: [__dirname + '/**/*.entity.ts'],
      entities: [User, Profile, Post],
      synchronize: true
      }), 
    UsersModule, PostModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
