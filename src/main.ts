import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // cut off all fileds that are not present in DTO
            forbidNonWhitelisted: true, // Returns an error if there are fields that are absent in DTO,
            transform: true, // transform income data to dto/other types. Can cause performance issues
        }),
    );
    await app.listen(3000);
}
bootstrap();
