import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
