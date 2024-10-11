import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
    @IsOptional()
    // @Type(() => Number)  Will convert query to Number. Removed because we use enableImplicitConversion: true in ValidationPipe
    @IsPositive()
    offset: number;

    @IsOptional()
    @IsPositive()
    limit: number;
}
