import { IsString, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";

export class FindAllQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  search: string;
}
