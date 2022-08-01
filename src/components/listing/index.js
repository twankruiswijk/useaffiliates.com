import { useState } from 'react';

import ListingItem from './listingItem';
import { FilterIcon, ChevronDownIcon, ClearIcon } from '../../lib/icons';
import { useFilter } from 'context/filterContext';
import Link from 'next/link';

export default function Listing({
  items,
  categories,
  paymentTypes,
  isValidating,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const { category, paymentType, cookiePeriod, updateFilters, clearFilters } =
    useFilter();

  const listTitleClasses = 'text-sm font-heading text-zinc-800 font-medium';
  const nFilters =
    Number(!!category) + Number(!!paymentType) + Number(!!cookiePeriod);

  const handleClearFilters = () => clearFilters();

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
          <p className="max-w-xl leading-normal mb-4">
            We do not have any affiliate programs based on these criteria. If
            you want to be the first, please{' '}
            <Link href="submit">
              <a className="underline font-medium hover:opacity-90">
                submit your program
              </a>
            </Link>
            !
          </p>

          <ClearFilterButton clearFilters={handleClearFilters} />
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
          key={i.id}
          image={i.logo}
          title={i.name}
          desc={i.description}
          categories={i.categories}
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
      <section className="flex flex-col border bg-white relative -mt-8 mb:-mt-24 lg:-mx-6 rounded shadow-md pt-4 md:pt-8">
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } order-2 md:order-1 md:grid--default px-6 py-6 md:py-0 md:mb-8 space-y-4 md:space-y-0 border-b md:border-b-0`}
        >
          <div className="col-span-4 lg:col-span-3">
            <Select
              id="category"
              label="Filter by Category"
              placeholder="Select a Category"
              values={categories}
              value={category}
              setValue={(v) => updateFilters({ category: v })}
            />
          </div>

          <div className="col-span-4 lg:col-span-3">
            <Select
              id="paymentType"
              label="Payment Type"
              placeholder="Select a Payment Type"
              values={paymentTypes}
              value={paymentType}
              setValue={(v) => updateFilters({ paymentType: v })}
            />
          </div>

          <div className="col-span-4 lg:col-span-3">
            <Select
              id="cookiePeriod"
              label="Cookie period"
              placeholder="Sort by cookie period"
              values={[{ name: 'ascending' }, { name: 'descending' }]}
              value={cookiePeriod}
              setValue={(v) => updateFilters({ cookiePeriod: v })}
            />
          </div>

          {nFilters > 0 && (
            <div className="col-span-12 lg:col-span-3 flex items-end justify-end lg:justify-start">
              <ClearFilterButton clearFilters={handleClearFilters} />
            </div>
          )}
        </div>

        <div className="border-b order-1 md:order-2 grid--default px-6 pb-1.5">
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

          <div className="col-span-6 md:hidden">
            <button
              aria-label={showFilters ? 'close filters' : 'show filters'}
              className="flex items-center ml-auto mt-[2px] font-heading text-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {nFilters > 0 && (
                <span className="bg-primary text-white h-4 w-4 flex items-center justify-center rounded-full text-[10px] mr-1">
                  {nFilters}
                </span>
              )}
              <FilterIcon classNames="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="order-3">{renderListItems()}</div>
      </section>
    </div>
  );
}

function Select({ id, label, placeholder, values, value, setValue }) {
  const renderSelectOptions = values.map((o) => (
    <option key={o.name} value={o.name}>
      {o.name}
    </option>
  ));

  return (
    <>
      <label
        htmlFor={id}
        className="text-zinc-900 font-heading text-sm font-medium mb-2 block"
      >
        {label}
      </label>
      <div className="flex justify-between items-center w-full shadow-button rounded p-2 relative h-9">
        <select
          name={id}
          id={id}
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

const ClearFilterButton = ({ clearFilters }) => {
  return (
    <button
      className="border h-9 shadow rounded px-3 flex items-center bg-gray-200 border-gray-400 text-gray-700 transition hover:bg-gray-300 hover:border-gray-500 hover:text-gray-800"
      onClick={clearFilters}
    >
      <span className="text-xs mr-1 font-heading font-semibold">
        Clear Filters
      </span>
      <ClearIcon classNames="h-3.5 w-3.5" />
    </button>
  );
};
