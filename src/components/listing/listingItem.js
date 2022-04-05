import { RecurringIcon } from '@/lib/icons';
import {
  CheckMarkIcon,
  ChevronRightIcon,
  QuestionMarkIcon,
  PaymentIcon,
  CoinIcon,
  CreditCardIcon,
  CrossMarkIcon,
} from 'lib/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ListingItem({
  image,
  title,
  desc,
  categories,
  paymentType,
  cookiePeriod,
  url,
  isSponsored,
}) {
  const router = useRouter();
  const textStyles = 'text-sm text-zinc-700 leading-snug';

  const renderCategories = categories.map((c) => {
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
        <a className="mr-1.5 mb-1.5 text-xs py-1 px-2.5 rounded font-medium capitalize bg-gray-200 text-zinc-800 transition duration-150 hover:bg-primary hover:text-white">
          {c.name}
        </a>
      </Link>
    );
  });
  return (
    <article className="md:grid--default py-4 odd:bg-primary/10 px-6">
      <div className="col-span-1 md:flex">
        <span
          className={`w-fit relative flex flex-column self-center rounded shadow-button mb-2 md:mb-0 bg-gradient-to-br from-primary to-orange-300 ${
            isSponsored ? 'mb-3 outline outline-2 outline-primary' : ''
          }`}
        >
          <Image
            src={image}
            alt={title}
            width={70}
            height={70}
            unoptimized={true}
            className="rounded"
          />

          {isSponsored && (
            <span className="absolute rounded-sm ml-[1px] -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white bg-primary px-1 py-.5">
              Sponsored
            </span>
          )}
        </span>
      </div>

      <div className="col-span-5 flex flex-col justify-center mb-4 md:mb-0">
        <h1 className="text-lg md:text-base font-heading text-zinc-800 font-semibold">
          {title}
        </h1>
        <p className={`${textStyles} mb-2`}>{desc}</p>

        <div className="flex flex-wrap">{renderCategories}</div>
      </div>

      <div className="col-span-2 flex flex-col justify-center mb-1.5 md:mb-0">
        <span className={`${textStyles} flex items-center`}>
          <span className="block md:hidden font-semibold mr-2">
            Payment Type:{' '}
          </span>

          <PaymentType type={paymentType} />
        </span>
      </div>

      <div className="col-span-2 flex flex-col justify-center mb-4 md:mb-0">
        <span className={`${textStyles} flex items-center`}>
          <span className="block md:hidden font-semibold mr-2">
            Cookie period:{' '}
          </span>
          <CookiePeriod period={cookiePeriod} />
        </span>
      </div>

      <div className="col-span-2 flex flex-col justify-center">
        <a
          href={`${url}?ref=useaffiliates.com`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={`${textStyles} flex items-center whitespace-nowrap	lg:whitespace-normal`}
        >
          Go to program
          <ChevronRightIcon classNames="h-5 w-5 ml-1 fill-zinc-800" />
        </a>
      </div>
    </article>
  );
}

const PaymentType = ({ type }) => {
  const getPaymentTypeMeta = () => {
    const iconClasses = 'h-5 w-5 mr-1.5 fill-zinc-800';

    switch (type) {
      case 'monthly':
        return {
          icon: <RecurringIcon classNames={iconClasses} />,
          label: 'Monthly',
        };
      case 'one-time':
        return {
          icon: <CreditCardIcon classNames={iconClasses} />,
          label: 'One-time',
        };
      case 'credits':
        return {
          icon: <CoinIcon classNames={iconClasses} />,
          label: 'Credits',
        };
      case 'multiple':
        return {
          icon: <PaymentIcon classNames={iconClasses} />,
          label: 'Multiple',
        };
      default:
        return {
          icon: <QuestionMarkIcon classNames={iconClasses} />,
          label: 'Unkown',
        };
    }
  };

  return (
    <>
      {getPaymentTypeMeta().icon}
      {getPaymentTypeMeta().label}
    </>
  );
};

const CookiePeriod = ({ period }) => {
  const iconClasses = 'h-5 w-5 mr-1.5';

  if (!period) {
    return (
      <>
        <CrossMarkIcon classNames={iconClasses} />
        {'no cookie'}
      </>
    );
  }

  return (
    <>
      <CheckMarkIcon classNames={iconClasses} />
      {period} {period > 1 ? 'days' : 'day'}
    </>
  );
};
