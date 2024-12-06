import { IsString, IsNumber, IsOptional, Length } from "class-validator";

export class CreateSongDto {
  @Length(1, 200)
  title: string;

  @Length(1, 200)
  artist: string;

  @Length(1, 200)
  album: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  coverUrl?: string;

  @IsNumber()
  playlistId: number;
}
