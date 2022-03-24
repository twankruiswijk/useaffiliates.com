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

export default function ListingItem({
  image,
  title,
  desc,
  paymentType,
  cookiePeriod,
  url,
}) {
  const textStyles = 'text-sm text-zinc-700 leading-snug';

  return (
    <article className="md:grid--default py-4 odd:bg-primary/10 px-6">
      <div className="col-span-1 md:flex md:flex-col justify-center mb-1.5 md:mb-0">
        <Image
          src={image}
          alt={title}
          width={70}
          height={70}
          className="rounded shadow-lg"
        />
      </div>

      <div className="col-span-5 flex flex-col justify-center mb-4 md:mb-0">
        <h1 className="text-lg md:text-base font-heading text-zinc-800 font-semibold">
          {title}
        </h1>
        <p className={textStyles}>{desc}</p>
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
