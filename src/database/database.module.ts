import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
    static register(dataSourceOptions: DataSourceOptions): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: new DataSource(dataSourceOptions),
                },
            ],
        };
    }
}
