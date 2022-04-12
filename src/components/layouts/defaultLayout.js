import Nav from '@/components/nav';
import Footer from 'components/nav/footer';
import Link from 'next/link';

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

                  <div id="revue-embed">
                    <form
                      action="https://www.getrevue.co/profile/useaffiliates/add_subscriber"
                      method="post"
                      id="revue-form"
                      name="revue-form"
                      target="_blank"
                    >
                      <div className="flex">
                        <label htmlFor="member_email" className="hidden">
                          Email address
                        </label>
                        <input
                          className="rounded px-4 py-2.5 min-w-[240px] max-w-full text-sm mr-2"
                          placeholder="Your email address..."
                          type="email"
                          name="member[email]"
                          id="member_email"
                        />

                        <input
                          type="submit"
                          value="Subscribe"
                          name="member[subscribe]"
                          id="member_submit"
                          className="rounded px-6 py-2.5 text-sm font-heading bg-black text-white transition cursor-pointer hover:bg-black/90"
                        />
                      </div>

                      <div className="revue-form-footer text-xs mt-3 text-white opacity-80">
                        By subscribing, you agree with Revue’s{' '}
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href="https://www.getrevue.co/terms"
                        >
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href="https://www.getrevue.co/privacy"
                        >
                          Privacy Policy
                        </a>
                        .
                      </div>
                    </form>
                  </div>
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
