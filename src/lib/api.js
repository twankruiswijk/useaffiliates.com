import fs from 'fs/promises';
import path from 'path';
import { getAllPrograms, getProgram } from 'lib/notion';

const pathToCacheFile = path.join(process.cwd(), '/src/cache/programs.json');

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
        const data = await fs.readFile(pathToCacheFile);
        const programs = JSON.parse(data);

        return programs.find((program) => program.id === id);
      } catch (err) {
        throw new Error('Could not read from cache file ', err);
      }
    },
    set: async (programs) => {
      try {
        return await fs.writeFile(pathToCacheFile, JSON.stringify(programs));
      } catch (err) {
        throw new Error('Could not write to cache file ', err);
      }
    },
  },
};

export default api;
