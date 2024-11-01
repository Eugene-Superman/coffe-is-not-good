import * as Joi from '@hapi/joi';
import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CofeesModule } from './cofees/cofees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        // TypeOrmModule.forRootAsync({             // If declared before configs there should be forRootAsync
        //     useFactory: () => ({
        //         host: process.env.DATABASE_HOST,
        //         port: +process.env.DATABASE_PORT,
        //         username: process.env.DATABASE_USER,
        //         password: process.env.DATABASE_PASSWORD,
        //         database: process.env.DATABASE_NAME,
        //         type: 'postgres',
        //         autoLoadEntities: true,
        //         synchronize: true, // Development only, disable for production
        //     }),
        // }),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.required(),
                DATABASE_PORT: Joi.number().default(5632),
            }),
            load: [appConfig],
        }),
        CofeesModule,
        TypeOrmModule.forRoot({
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            type: 'postgres',
            autoLoadEntities: true,
            synchronize: true, // Development only, disable for production
        }),
        CoffeeRatingModule,
        DatabaseModule,
        CommonModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // {
        //     provide: APP_PIPE,
        //     useClass: ValidationPipe,            //Global pipe binding
        // },
    ],
})
export class AppModule {}
