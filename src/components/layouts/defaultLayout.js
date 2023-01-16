import Nav from '@/components/nav';
import Footer from 'components/nav/footer';
import ConvertKitForm from 'convertkit-react/bin/convertkit-react.esm';

import Button from '@/shared/button';

export default function defaultLayout({
  isSmall,
  title,
  category,
  button,
  children,
  showNewsletter,
}) {
  const resolveSize = isSmall ? 'md:h-[19rem]' : ' md:h-[28rem]';

  const renderTitle = () => {
    const titleStyles =
      'font-heading font-extrabold leading-tight text-white text-[2rem] md:text-[2.875rem]';

    if (category) {
      return (
        <div className="col-span-full lg:col-span-10">
          <h1 className={titleStyles}>
            <span className="block underline capitalize mb-2">{category}</span>
            {title}
          </h1>
        </div>
      );
    }

    return (
      <div className="col-span-full lg:col-span-8">
        <h1 className={`${titleStyles}`}>{title}</h1>

        {button && <Button url={button.link} title={button.title} sx="mt-4" />}
      </div>
    );
  };

  return (
    <>
      <section
        className={`bg-hero-pattern bg-blend-color relative ${resolveSize} md:z-0`}
      >
        <div className="bg-primary bg-opacity-95 absolute inset-0 z-0" />

        <div className="relative">
          <Nav />

          <div className="container">
            <div className="grid--default pt-6 pb-16 md:py-12">
              {renderTitle()}

              {showNewsletter && (
                <div className="col-span-full mt-2">
                  <p className="text-white font-medium mb-2 text-sm md:text-base">
                    Receive monthly emails with new affiliate program
                    opportunities.
                  </p>

                  <ConvertKitForm
                    formId={4011061}
                    template="clare"
                    hideName
                    emailPlaceholder="Your email address..."
                    submitText="subscribe"
                    buttonBackground="#000"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <main>{children}</main>

      <Footer />
    </>
  );
}
