import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DB_ID || '';

function normalizePrograms(programs) {
  return programs.map((p) => ({
    id: p.id,
    logo: p.properties.logo?.files[0]?.file.url || '/img/placeholder.png',
    name: p.properties.name?.title[0]?.plain_text || '',
    description: p.properties.description?.rich_text[0]?.plain_text || '',
    categories: p.properties.category?.multi_select || [],
    paymentType: p.properties.payment_type?.select?.name || '',
    cookiePeriod: p.properties.cookie_period?.number || '',
    link: p.properties.url?.url || '',
    isSponsoredHome: p.properties.is_sponsored_home?.checkbox,
    isSponsoredCategory: p.properties.is_sponsored_category?.checkbox,
  }));
}

export const getPrograms = async (
  cursor,
  category,
  paymentType,
  cookiePeriod,
) => {
  const resolveFilters = () => {
    const filters = [
      {
        property: 'published',
        checkbox: {
          equals: true,
        },
      },
    ];

    if (!!category) {
      filters.push({
        property: 'category',
        multi_select: {
          contains: decodeURIComponent(category),
        },
      });
    }

    if (!!paymentType) {
      filters.push({
        property: 'payment_type',
        select: {
          equals: paymentType,
        },
      });
    }

    return filters;
  };

  const resolveSorts = () => {
    const sorts = category
      ? [{ property: 'is_sponsored_category', direction: 'descending' }]
      : [{ property: 'is_sponsored_home', direction: 'descending' }];

    if (!!cookiePeriod) {
      sorts.push({
        property: 'cookie_period',
        direction: cookiePeriod,
      });
    }

    return sorts;
  };

  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 12,
    start_cursor: cursor || undefined,
    filter: {
      and: resolveFilters(),
    },
    sorts: resolveSorts(),
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
