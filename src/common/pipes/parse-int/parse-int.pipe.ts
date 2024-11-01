import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        const intVal = parseInt(value, 10);
        if (isNaN(intVal)) {
            throw new BadRequestException(
                `Validation failed. "${intVal}" is not an integer.`,
            );
        }
        return intVal;
    }
}
