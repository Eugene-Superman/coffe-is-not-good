import { Module } from '@nestjs/common';
import { CofeesController } from './cofees.controller';
import { CofeesService } from './cofees.service';

@Module({
    controllers: [CofeesController],
    providers: [CofeesService],
})
export class CofeesModule {}
