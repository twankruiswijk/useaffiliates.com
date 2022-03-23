import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DB_ID || '';

function normalizePrograms(programs) {
  return programs.map((p) => ({
    logo: p.properties.logo?.files[0]?.file.url || '/img/placeholder.png',
    name: p.properties.name?.title[0]?.plain_text || '',
    description: p.properties.description?.rich_text[0]?.plain_text || '',
    paymentType: p.properties.payment_type?.select?.name || '',
    cookiePeriod: p.properties.has_cookie?.select?.name || '',
    link: p.properties.url?.url || '',
  }));
}

export const getPrograms = async (cursor, category) => {
  const resolveFilters = () => {
    const defaultFilters = [
      {
        property: 'published',
        checkbox: {
          equals: true,
        },
      },
    ];

    if (category) {
      return [
        ...defaultFilters,
        {
          property: 'category',
          multi_select: {
            contains: category,
          },
        },
      ];
    }

    return defaultFilters;
  };

  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 12,
    start_cursor: cursor || undefined,
    filter: {
      and: resolveFilters(),
    },
  });

  return {
    data: normalizePrograms(response.results),
    hasMore: response.has_more,
    nextCursor: response.next_cursor,
  };
};

export const getCategories = async () => {
  const response = await notion.databases.retrieve({
    database_id: databaseId,
  });

  const categories = response.properties.category?.multi_select.options;

  return {
    data: categories,
  };
};

export const getPaymentTypes = async () => {
  const response = await notion.databases.retrieve({
    database_id: databaseId,
  });

  return {
    data: response.properties.payment_type?.select.options,
  };
};
