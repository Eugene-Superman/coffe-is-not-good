import { Injectable, Module } from '@nestjs/common';
import { CofeesController } from './cofees.controller';
import { CofeesService } from './cofees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cofee } from './entities/cofee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/enities/event.entity';
import { COFFEES_BARNDS } from './cofees.constants';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import cofeesConfig from './config/cofees.config';

class ConfigService {}
class DevelopmentService {}
class ProductionService {}

@Injectable()
export class CoffeesBrandFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
    imports: [
        TypeOrmModule.forFeature([Cofee, Flavor, Event]),
        ConfigModule.forFeature(cofeesConfig),
    ],
    controllers: [CofeesController],
    providers: [
        CofeesService,
        CoffeesBrandFactory,
        {
            provide: COFFEES_BARNDS,
            useFactory: async (
                dataSource: DataSource, // Factory example when wee need to wait until action isfinished
            ) => {
                const cofees = await dataSource.query(
                    'SELECT brand FROM cofee',
                );
                console.log('Async is finished!!');
                return cofees;
            },
            inject: [DataSource],
        },
        // {
        //     provide: COFFEES_BARNDS,
        //     useFactory: (
        //         coffeesBrandFactory: CoffeesBrandFactory, // Factory example
        //     ) => coffeesBrandFactory.create(),
        //     inject: [CoffeesBrandFactory],
        // },
        // {
        //     provide: COFFEES_BARNDS,
        //     useValue: ['buddy brew', 'nescafe'],         // Value example
        // },
        // {
        //     provide: ConfigService,
        //     useClass:                                   // Class example
        //         process.env.NODE_ENV === 'development'
        //             ? DevelopmentService
        //             : ProductionService,
        // },
    ],
    exports: [CofeesService],
})
export class CofeesModule {}
