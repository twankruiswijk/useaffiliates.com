export default function defaultLayout({ title, children }) {
  return (
    <>
      <main>
        <section className="bg-hero-pattern bg-blend-color h-96 relative">
          <div className="bg-primary bg-opacity-95 absolute inset-0 z-0" />
          <div className="container relative z-10 ">
            {/* Insert navigation here */}
            <div className="grid grid-cols-12 grid-rows-[min-content] gap-4">
              <div className="col-span-full lg:col-span-8">
                <h1 className="font-heading font-extrabold leading-tight text-white text-[2.875rem]">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {children}
      </main>
    </>
  );
}
