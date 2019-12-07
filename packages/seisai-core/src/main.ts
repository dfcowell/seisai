import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import createRedisStore from 'connect-redis';
import { createClient } from 'redis';

const RedisStore = createRedisStore(session);
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : null,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 0
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new RedisStore({
        client: redisClient,
        ttl: 86400
      })
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();
