import {
  IsString,
  IsOptional,
  IsNumber,
  Length,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import { Song } from "../../entities/Song";

export class CreatePlaylistDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;

  @IsString()
  @IsOptional()
  coverUrl?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => Song)
  songs: Song[];
}
