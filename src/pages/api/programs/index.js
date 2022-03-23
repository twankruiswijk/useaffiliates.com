import { getPrograms } from '@/lib/notion';

export default async function handler(req, res) {
  const { cursor, category } = req.query;
  const programs = await getPrograms(cursor, category);

  res.status(200).json(programs);
}
