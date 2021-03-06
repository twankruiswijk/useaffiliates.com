import Link from 'next/link';
import { useFilter } from 'context/filterContext';

export default function CategoryTags({ categories }) {
  const { category, paymentType, cookiePeriod } = useFilter();

  const renderCategories = categories.map((c) => {
    const tagStyles =
      'mr-2 mb-2 text-xs py-1 px-2.5 rounded font-normal capitalize';

    if (c.name === category) {
      return (
        <div
          key={c.id}
          className={`${tagStyles} bg-primary text-white cursor-default`}
        >
          {c.name}
        </div>
      );
    }

    return (
      <Link
        key={c.id}
        href={{
          pathname: `/programs/${encodeURIComponent(c.name)}`,
          query: {
            ...(paymentType ? { paymentType } : {}),
            ...(cookiePeriod ? { cookiePeriod } : {}),
          },
        }}
      >
        <a
          className={`${tagStyles} bg-primary/25 text-zinc-800 transition duration-150 hover:bg-primary hover:text-white`}
        >
          {c.name}
        </a>
      </Link>
    );
  });

  return <div className="flex flex-wrap">{renderCategories}</div>;
}
