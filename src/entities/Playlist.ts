import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Song, (song) => song.playlists, { cascade: true })
  @JoinTable({ name: "playlist_songs" })
  songs: Song[];
}
