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

export const getPrograms = async ({
  cursor = undefined,
  category = '',
  paymentType = '',
  cookiePeriod = '',
  pageSize = 12,
} = {}) => {
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
    page_size: pageSize,
    start_cursor: cursor,
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

export const getAllPrograms = async (cursor = undefined, data = []) => {
  const programs = await getPrograms({ cursor, pageSize: 100 });
  const newData = [...data, ...programs.data];

  if (programs.hasMore) {
    return await getAllPrograms(programs.nextCursor, newData);
  }

  return newData;
};

function normalizeProgram(program) {
  return {
    id: program.id,
    logo: program.properties.logo?.files[0]?.file.url || '/img/placeholder.png',
    name: program.properties.name?.title[0]?.plain_text || '',
    description: program.properties.description?.rich_text[0]?.plain_text || '',
    categories: program.properties.category?.multi_select || [],
    paymentType: program.properties.payment_type?.select?.name || '',
    cookiePeriod: program.properties.cookie_period?.number || '',
    link: program.properties.url?.url || '',
    isSponsoredHome: program.properties.is_sponsored_home?.checkbox,
    isSponsoredCategory: program.properties.is_sponsored_category?.checkbox,
  };
}

export const getProgram = async (id) => {
  const response = await notion.pages.retrieve({
    page_id: id,
  });

  return await normalizeProgram(response);
};
