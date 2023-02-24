import {
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateNoteDto {
  @IsString()
  @MinLength(1, { message: "Title must be at least 1 character long." })
  @MaxLength(100, { message: "Title Must not be greater than 100 characters." })
  readonly title: string;

  @IsString()
  @MinLength(20, { message: "Note must be at least 20 characters long." })
  @MaxLength(300, { message: "Note Must not be greater than 300 characters." })
  readonly note: string;

  @IsBoolean()
  @IsOptional()
  readonly indexed: boolean;
}
