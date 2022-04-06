import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFilter } from 'context/filterContext';

export default function CategoryTags({ categories }) {
  const { category } = useFilter();
  const router = useRouter();

  const renderCategories = categories.map((c) => {
    const tagStyles =
      'mr-1.5 mb-1.5 text-xs py-1 px-2.5 rounded font-medium capitalize';

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
            ...router.query,
          },
        }}
      >
        <a
          className={`${tagStyles} bg-gray-200 text-zinc-800 transition duration-150 hover:bg-primary hover:text-white`}
        >
          {c.name}
        </a>
      </Link>
    );
  });

  return <div className="flex flex-wrap">{renderCategories}</div>;
}
