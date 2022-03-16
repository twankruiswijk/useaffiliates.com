import Image from 'next/image';

export default function ListingItem({
  image,
  title,
  desc,
  paymentType,
  hasCookie,
  url,
}) {
  const textStyles = 'text-sm text-zinc-800 leading-snug';

  return (
    <article className="grid--default py-4 odd:bg-primary/10 px-6">
      <div className="col-span-1 flex flex-col justify-center">
        <Image
          src={image}
          alt={title}
          width={70}
          height={70}
          className="rounded shadow-lg"
        />
      </div>

      <div className="col-span-5 flex flex-col justify-center">
        <h1 className="text-base font-heading text-zinc-800 font-semibold">
          {title}
        </h1>
        <p className={textStyles}>{desc}</p>
      </div>

      <div className="col-span-2 flex flex-col justify-center">
        <span className={`${textStyles} flex items-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          {paymentType}
        </span>
      </div>
      <div className="col-span-2 flex flex-col justify-center">
        <span className={`${textStyles} flex items-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {hasCookie}
        </span>
      </div>

      <div className="col-span-2 flex flex-col justify-center">
        <a
          href={`${url}?ref=useaffiliates.com`}
          className={`${textStyles} flex items-center`}
        >
          Go to program
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
