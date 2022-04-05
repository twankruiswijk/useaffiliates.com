import { useState } from 'react';

import ListingItem from './listingItem';
import { ChevronDownIcon, ClearIcon } from '../../lib/icons';
import { useFilter } from 'context/filterContext';
import Link from 'next/link';

export default function Listing({
  items,
  categories,
  paymentTypes,
  isValidating,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const {
    category,
    paymentType,
    cookiePeriod,
    updateCategory,
    updatePaymentType,
    updateCookiePeriod,
    clearFilters,
  } = useFilter();

  const listTitleClasses = 'text-sm font-heading text-zinc-800 font-semibold';

  const renderListItems = () => {
    if (!items.length && isValidating) {
      return (
        <div className="py-12 odd:bg-primary/10 px-6">
          <p className="font-heading text-zinc-800">Loading...</p>
        </div>
      );
    }

    if (!items.length) {
      return (
        <div className="py-12 odd:bg-primary/10 px-6">
          <p className="max-w-xl leading-normal">
            We do not have any affiliate programs based on these criteria. If
            you want to be the first, please{' '}
            <Link href="submit">
              <a className="underline font-medium hover:opacity-90">
                submit your program
              </a>
            </Link>
            !
          </p>

          <button
            className="mt-6 px-6 py-2.5 bg-primary font-heading text-white rounded shadow-button transition hover:bg-primary/90"
            onClick={() => clearFilters(true)}
          >
            Clear filters
          </button>
        </div>
      );
    }

    const listItems = items.map((i) => {
      const isSponsored = () => {
        if (!i.isSponsoredHome && !i.isSponsoredCategory) {
          return false;
        }

        if (category && !i.isSponsoredCategory) {
          return false;
        }

        if (!category && i.isSponsoredCategory) {
          return false;
        }

        return true;
      };

      return (
        <ListingItem
          key={i.name}
          image={i.logo}
          title={i.name}
          desc={i.description}
          paymentType={i.paymentType}
          cookiePeriod={i.cookiePeriod}
          isSponsored={isSponsored()}
          url={i.link}
        />
      );
    });

    return listItems;
  };

  return (
    <div className="container">
      <section className="bg-white relative -mt-8 mb:-mt-24 lg:-mx-6 rounded shadow-md pt-4 md:pt-8">
        <button
          className="md:hidden text-sm relative font-heading flex justify-center items-center rounded ml-auto mr-4 pr-2 py-1.5 mb-4 min-w-[8.5rem] border border-zinc-800"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'hide filters' : 'show filters'}
          <ChevronDownIcon classNames="h-5 w-5 fill-zinc-500 absolute right-1" />
        </button>

        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:grid--default px-6 mb-6 md:mb-12 space-y-4 md:space-y-0`}
        >
          <div className="col-span-4 lg:col-span-3">
            <Select
              label="Filter by Category"
              placeholder="Select a Category"
              values={categories}
              value={category}
              setValue={(v) => updateCategory(v)}
            />
          </div>

          <div className="col-span-4 lg:col-span-3">
            <Select
              label="Payment Type"
              placeholder="Select a Payment Type"
              values={paymentTypes}
              value={paymentType}
              setValue={(v) => updatePaymentType(v)}
            />
          </div>

          <div className="col-span-4 lg:col-span-3">
            <Select
              label="Cookie period"
              placeholder="Sort by cookie period"
              values={[{ name: 'ascending' }, { name: 'descending' }]}
              value={cookiePeriod}
              setValue={(v) => updateCookiePeriod(v)}
            />
          </div>

          <div className="col-span-12 lg:col-span-3 flex items-end">
            <button
              className="flex items-center"
              onClick={() => clearFilters()}
            >
              <ClearIcon classNames="h-5 w-5 fill-zinc-500 md:mb-2" />

              {isValidating && (
                <span className="ml-1.5 md:mb-1.5 text-xs font-heading font-semibold text-zinc-500">
                  loading...
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid--default px-6 mb-1.5">
          <div className="col-span-6">
            <span className={listTitleClasses}>Program</span>
          </div>

          <div className="col-span-2 hidden md:block">
            <span className={listTitleClasses}>Payment type</span>
          </div>

          <div className="col-span-2 hidden md:block">
            <span className={listTitleClasses}>Has cookie</span>
          </div>

          <div className="col-span-2 hidden md:block">
            <span className={listTitleClasses}>Link</span>
          </div>
        </div>

        <div className="mt-2">{renderListItems()}</div>
      </section>
    </div>
  );
}

function Select({ label, placeholder, values, value, setValue }) {
  const renderSelectOptions = values.map((o) => (
    <option key={o.name} value={o.name}>
      {o.name}
    </option>
  ));

  return (
    <>
      <label
        htmlFor="category"
        className="text-zinc-900 font-heading text-sm font-semibold mb-2 block"
      >
        {label}
      </label>
      <div className="flex justify-between items-center w-full shadow-button rounded p-2 relative h-9">
        <select
          name="category"
          id="category"
          className="w-full bg-transparent text-sm pl-2.5 appearance-none capitalize absolute z-10 inset-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {renderSelectOptions}
        </select>

        <ChevronDownIcon classNames="h-5 w-5 fill-zinc-600 z-0 absolute right-2" />
      </div>
    </>
  );
}
