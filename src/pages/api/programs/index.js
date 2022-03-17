import { getPrograms } from '@/lib/notion';

export default async function handler(req, res) {
  const programs = await getPrograms();

  res.status(200).json(programs.data);
}
