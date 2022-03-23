import ListingItem from './listingItem';
import { ChevronDownIcon } from '../../lib/icons';
import { useFilter } from 'context/filterContext';
import Link from 'next/link';

export default function Listing({ items, categories, paymentTypes }) {
  const {
    category,
    paymentType,
    cookiePeriod,
    updateCategory,
    updatePaymentType,
    updateCookiePeriod,
  } = useFilter();

  const listTitleClasses = 'text-sm font-heading text-zinc-800 font-semibold';

  const renderListItems = () => {
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
        </div>
      );
    }

    return items.map((i) => (
      <ListingItem
        key={i.name}
        image={i.logo}
        title={i.name}
        desc={i.description}
        paymentType={i.paymentType}
        cookiePeriod={i.cookiePeriod}
        url={i.link}
      />
    ));
  };

  return (
    <div className="container">
      <section className="bg-white relative -mt-8 mb:-mt-24 lg:-mx-6 rounded shadow-md pt-8">
        <div className="md:grid--default px-6 mb-6 md:mb-12 space-y-4 md:space-y-0">
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
