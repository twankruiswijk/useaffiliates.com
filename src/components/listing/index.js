import ListingItem from './listingItem';

export default function Listing() {
  const listTitleClasses = 'text-sm font-heading text-zinc-800 font-semibold';

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

        <div>
          <ListingItem
            image="/img/placeholder.png"
            title="Shopify"
            desc="Earn up to $2000.- per successful sign-up. What are you going to do with all that extra cash?"
            paymentType="One-time payment"
            hasCookie="30 days"
            url="#"
          />

          <ListingItem
            image="/img/placeholder.png"
            title="The Body Shop"
            desc="Earn up to 8% in commision with one of the UK's fastest growing and best-loved beauty sites, this is your chance to earn additional income whilst being partnered with an ethical and iconic British brand."
            paymentType="One-time payment"
            hasCookie="30 days"
            url="#"
          />

          <ListingItem
            image="/img/placeholder.png"
            title="Shopify"
            desc="Earn up to $2000.- per successful sign-up. What are you going to do with all that extra cash?"
            paymentType="One-time payment"
            hasCookie="30 days"
            url="#"
          />

          <ListingItem
            image="/img/placeholder.png"
            title="Shopify"
            desc="Earn up to $2000.- per successful sign-up. What are you going to do with all that extra cash?"
            paymentType="One-time payment"
            hasCookie="30 days"
            url="#"
          />
        </div>
      </section>
    </div>
  );
}
