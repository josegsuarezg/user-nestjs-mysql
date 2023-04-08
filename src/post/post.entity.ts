import { User } from "src/users/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;
  
  @Column()
  content: string;
  
  @Column()
  authorId: number;
  
  @ManyToOne(()=> User, user => user.post)
  author: User;
}