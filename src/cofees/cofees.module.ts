import { Module } from '@nestjs/common';
import { CofeesController } from './cofees.controller';
import { CofeesService } from './cofees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cofee } from './entities/cofee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/enities/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cofee, Flavor, Event])],
    controllers: [CofeesController],
    providers: [CofeesService],
})
export class CofeesModule {}
