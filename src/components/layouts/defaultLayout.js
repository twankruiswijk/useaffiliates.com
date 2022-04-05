import Nav from '@/components/nav';
import Footer from 'components/nav/footer';
import Link from 'next/link';

export default function defaultLayout({ title, category, button, children }) {
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
        <h1 className={`${titleStles} mb-6`}>{title}</h1>

        {button && (
          <Link href={button.link}>
            <a className="bg-black text-white px-6 py-3 rounded shadow-button font-heading text-bold transition hover:bg-black/90">
              {button.title}
            </a>
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      <section className="bg-hero-pattern bg-blend-color relative md:h-96 md:z-0">
        <div className="bg-primary bg-opacity-95 absolute inset-0 z-0" />

        <div className="relative">
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
