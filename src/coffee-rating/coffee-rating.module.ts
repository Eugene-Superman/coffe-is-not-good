import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CofeesModule } from 'src/cofees/cofees.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [
        DatabaseModule.register({
            type: 'postgres',
            host: 'localhost',
            password: 'password',
            port: 5432,
        }),
        CofeesModule,
    ],
    providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
