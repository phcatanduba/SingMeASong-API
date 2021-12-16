import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("songs")
export default class Song {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  name: string;

  @Column()
  youtubeLink: string;

  @Column({ default: 0 })
  score: number;
}