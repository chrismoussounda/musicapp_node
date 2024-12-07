import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Playlist } from "./Playlist";
import { IsString, IsNumber, IsOptional } from "class-validator";

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  artist: string;

  @Column()
  @IsString()
  album: string;

  @Column()
  @IsNumber()
  duration: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  url?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  coverUrl?: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  playlists: Playlist[];
}
