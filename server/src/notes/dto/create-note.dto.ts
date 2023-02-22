import { IsString, Max, Min } from "class-validator";

export class CreateNoteDto {
  @IsString()
  @Min(1, { message: "Title must be at least 1 character long." })
  @Max(100, { message: "Title Must not be greater than 100 characters." })
  readonly title: string;

  @IsString()
  @Min(20, { message: "Note must be at least 20 characters long." })
  @Max(300, { message: "Note Must not be greater than 300 characters." })
  readonly note: string;
}
