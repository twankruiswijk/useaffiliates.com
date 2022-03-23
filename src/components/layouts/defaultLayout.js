import Nav from '@/components/nav';
import Footer from 'components/nav/footer';

export default function defaultLayout({ title, category, children }) {
  const renderTitle = () => {
    const titleStles =
      'font-heading font-extrabold leading-tight text-white text-[2rem] md:text-[2.875rem]';

    if (category) {
      return (
        <div className="col-span-full lg:col-span-10">
          <h1 className={titleStles}>
            <span className="block underline capitalize mb-2">{category}</span>
            {title}
          </h1>
        </div>
      );
    }

    return (
      <div className="col-span-full lg:col-span-8">
        <h1 className={titleStles}>{title}</h1>
      </div>
    );
  };

  return (
    <>
      <section className="bg-hero-pattern bg-blend-color relative md:h-96 md:z-0">
        <div className="bg-primary bg-opacity-95 absolute inset-0 z-0" />

        <div className="relative z-10">
          <Nav />

          <div className="container">
            <div className="grid--default pt-6 pb-16 md:py-12">
              {renderTitle()}
            </div>
          </div>
        </div>
      </section>

      <main>{children}</main>

      <Footer />
    </>
  );
}
