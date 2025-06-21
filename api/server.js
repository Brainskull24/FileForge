const Fastify = require('fastify');
const dotenv = require('dotenv');

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(require('@fastify/cors'));
fastify.register(require('fastify-jwt'), { secret: process.env.JWT_SECRET });
fastify.register(require('fastify-multipart'));

fastify.get('/ping', async () => ({ pong: 'it works!' }));

fastify.listen({ port: process.env.PORT || 3001 , host: "0.0.0.0"}, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});