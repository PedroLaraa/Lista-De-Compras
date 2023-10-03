import { IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  name: string;

  @IsString()
  date: string;
}
