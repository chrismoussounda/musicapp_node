import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Song } from "./Song";

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @OneToMany(() => Song, (song) => song.playlist, { cascade: true })
  songs: Song[];
}
