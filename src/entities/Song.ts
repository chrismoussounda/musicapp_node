import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { Playlist } from "./Playlist";

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "playlist_id" })
  playlistId: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  album: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  @JoinColumn({ name: "playlist_id" })
  playlist: Playlist;
}
