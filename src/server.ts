import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import dotenv from 'dotenv';
import registerRoutes from './routes/index';

dotenv.config();

const app = Fastify({ logger: true });

// Register @fastify/sensible plugin
app.register(sensible);

const start = async (): Promise<void> => {
  await app.register(cors);
  registerRoutes(app);

  try {
    await app.listen({ port: 3000 });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
