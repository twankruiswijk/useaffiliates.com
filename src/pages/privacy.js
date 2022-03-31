import DefaultLayout from '@/components/layouts/defaultLayout';

export default function Privacy() {
  return (
    <DefaultLayout title="Connecting creators with affiliate programs.">
      <div className="container">
        <section className="bg-white relative -mt-8 mb:-mt-24 lg:-mx-6 rounded shadow-md px-6 py-4 md:py-8">
          <div className="grid--default">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <h2 className="text-3xl font-heading mb-2">Privacy</h2>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
