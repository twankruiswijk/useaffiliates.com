import { getPrograms } from '@/lib/notion';

export default async function handler(req, res) {
  const { cursor } = req.query;
  const programs = await getPrograms(cursor);

  res.status(200).json(programs);
}
