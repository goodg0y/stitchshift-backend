import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe global: semua DTO otomatis divalidasi oleh class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang properti yang tidak ada di DTO
      forbidNonWhitelisted: true, // tolak request yang membawa properti asing
      transform: true, // ubah payload menjadi instance DTO
    }),
  );

  // Izinkan frontend React (Vite) memanggil backend ini dari browser
  app.enableCors({ origin: 'http://localhost:5173' });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
