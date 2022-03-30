import DefaultLayout from '@/components/layouts/defaultLayout';

export default function Submit() {
  return (
    <DefaultLayout title="Start gathering more sign-ups for your affiliate program today.">
      <div className="container">
        <section className="bg-white relative -mt-8 mb:-mt-24 lg:-mx-6 rounded shadow-md px-6 py-4 md:py-8">
          <div className="grid--default">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <h2 className="text-3xl font-heading mb-2">
                Start gathering more sign-ups for your affiliate program today.
              </h2>
              <p className="mb-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                sequi ea earum facere in explicabo expedita quidem unde soluta
                dignissimos, sapiente natus doloremque odit ab omnis commodi
                illum ullam!
              </p>

              <h2 className="text-3xl font-heading mb-2">
                This is a header example
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                sequi ea earum facere in explicabo expedita quidem unde soluta
                dignissimos, sapiente natus doloremque odit ab omnis commodi
                illum ullam!
              </p>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
