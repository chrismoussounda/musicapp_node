import { IsString, IsOptional, Length } from "class-validator";

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
}
