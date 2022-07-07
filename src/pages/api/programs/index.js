import { getPrograms } from '@/lib/notion';

export default async function handler(req, res) {
  const { cursor, category, paymentType, cookiePeriod } = req.query;

  const programs = await getPrograms({
    cursor,
    category,
    paymentType,
    cookiePeriod,
  });

  res.status(200).json(programs);
}
