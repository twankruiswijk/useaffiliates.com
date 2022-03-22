import ListingItem from './listingItem';

export default function Listing({ items }) {
  const listTitleClasses = 'text-sm font-heading text-zinc-800 font-semibold';

  const renderListItems = items.map((i) => (
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

  return (
    <div className="container">
      <section className="bg-white relative z-10 -mt-24 -mx-6 rounded-sm shadow-md pt-8">
        <div className="grid--default px-6 mb-1.5">
          <div className="col-span-6">
            <span className={listTitleClasses}>Program</span>
          </div>

          <div className="col-span-2">
            <span className={listTitleClasses}>Payment type</span>
          </div>

          <div className="col-span-2">
            <span className={listTitleClasses}>Has cookie</span>
          </div>

          <div className="col-span-2">
            <span className={listTitleClasses}>Link</span>
          </div>
        </div>

        <div>{renderListItems}</div>
      </section>
    </div>
  );
}