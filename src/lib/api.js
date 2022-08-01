import { Redis } from '@upstash/redis';
import { getAllPrograms, getProgram } from 'lib/notion';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const api = {
  list: async () => {
    const programs = await getAllPrograms();
    return programs;
  },
  fetch: async (id) => {
    const program = await getProgram(id);
    return program;
  },
  cache: {
    get: async (id) => {
      try {
        const data = await redis.get('programs');

        return data.find((program) => program.id === id);
      } catch (err) {
        throw new Error('Could not read from cache file ', err);
      }
    },
    set: async (programs) => {
      try {
        return await redis.set('programs', programs);
      } catch (err) {
        throw new Error('Could not write to cache file ', err);
      }
    },
  },
};

export default api;
