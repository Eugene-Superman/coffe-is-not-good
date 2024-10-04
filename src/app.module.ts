import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CofeesModule } from './cofees/cofees.module';

@Module({
    imports: [CofeesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
