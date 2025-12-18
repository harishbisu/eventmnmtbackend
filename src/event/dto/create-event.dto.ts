import { 
  IsString, IsArray, IsDateString, IsNotEmpty, 
  Validate, IsOptional, MinLength 
} from 'class-validator';
import { IsAfter } from 'src/shared/validator/is-after.validator';

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsDateString()
  startTime!: string;

  @IsDateString()
  @Validate(IsAfter, ['startTime'])
  endTime!: string;

  @IsString()
  timezone!: string;

  @IsArray()
  @IsString({ each: true })
  userIds!: string[];

  @IsString()
  @IsNotEmpty()
  createdBy!: string;
}
