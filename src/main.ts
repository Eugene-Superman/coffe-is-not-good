import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // cut off all fileds that are not present in DTO
            forbidNonWhitelisted: true, // Returns an error if there are fields that are absent in DTO,
            transform: true, // transform income data to dto/other types. Can cause performance issues
            transformOptions: {
                enableImplicitConversion: true, // willl set type based on class field type. Used to prevent @Type(() => Number)
            },
        }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    // app.useGlobalGuards(new ApiKeyGuard()); // Works only if Guard doesn't have dependency injections
    app.useGlobalInterceptors(
        new WrapResponseInterceptor(),
        new TimeoutInterceptor(),
    );
    await app.listen(3030);
}
bootstrap();
