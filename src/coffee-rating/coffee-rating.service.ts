import { Injectable } from '@nestjs/common';
import { CofeesService } from 'src/cofees/cofees.service';

@Injectable()
export class CoffeeRatingService {
    constructor(private readonly coffeeService: CofeesService) {}
}
