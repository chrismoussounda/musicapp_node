import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Playlist } from './entities/Playlist';
import { Song } from './entities/Song';
import { config } from 'dotenv';

config();

const isProduction = process.env.NODE_ENV === 'production';

export const datasource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  synchronize: true,
  logging: !isProduction,
  entities: [Playlist, Song],
  migrations: [],
  subscribers: [],
});
