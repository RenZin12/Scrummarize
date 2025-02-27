import { z } from 'zod';

const envSchema = z.object({
  POSTGRESQL_HOST: z.string(),
  POSTGRESQL_DATABASE: z.string(),
  POSTGRESQL_PORT: z.string().regex(/^\d+$/).transform(Number),
  POSTGRESQL_USER: z.string(),
  POSTGRESQL_PASSWORD: z.string(),
  PORT: z.string().regex(/^\d+$/).transform(Number),
});
const env = envSchema.parse(process.env);

export default env;
