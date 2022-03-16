import Nav from '@/components/nav';

export default function defaultLayout({ title, children }) {
  return (
    <>
      <main>
        <section className="bg-hero-pattern bg-blend-color h-96 relative">
          <div className="bg-primary bg-opacity-95 absolute inset-0 z-0" />

          <div className="relative z-10">
            <Nav />

            <div className="container">
              <div className="grid--default py-12">
                <div className="col-span-full lg:col-span-8">
                  <h1 className="font-heading font-extrabold leading-tight text-white text-3xl md:text-[2.875rem] ">
                    {title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {children}
      </main>
    </>
  );
}
