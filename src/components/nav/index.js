import { useState } from 'react';
import Link from 'next/link';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import Button from '@/shared/button';

export default function Nav() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const mobileMediaQuery = useMediaQuery('(max-width: 768px)');
  const isMobile = menuIsOpen && mobileMediaQuery;

  const mobileMenuClasses =
    'absolute lef-0 right-0 top-[76px] flex flex-col bg-gradient-to-b from-primary to-orange-400 space-y-5 w-full px-4 pb-5 shadow-[0_4px_4px_-4px,rgba(0,0,0,0.15)] z-10';

  return (
    <header className={isMobile ? 'bg-primary' : ''}>
      <div className="container">
        <nav className="grid--default items-center py-4">
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <Link href="/">
              <a className="font-heading text-white font-bold text-sm leading-none md:text-base lg:text-lg">
                $ useaffiliates
              </a>
            </Link>
          </div>

          <div className="md:hidden flex justify-end col-start-7 col-span-6">
            <button
              className="w-36 py-3 border-2 text-white rounded font-heading font-bold leading-none"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              {isMobile ? 'Close menu' : 'Open menu'}
            </button>
          </div>

          <div
            className={`${
              isMobile ? mobileMenuClasses : 'hidden'
            } md:flex md:col-start-5 md:col-span-8 lg:col-start-7 lg:col-span-6 md:space-x-6 md:items-center md:justify-end`}
          >
            <NavLink href="mailto:hello@useaffiliates.com">contact</NavLink>

            <NavLink href="/terms" mobileOnly>
              terms
            </NavLink>

            <NavLink href="/privacy" mobileOnly>
              privacy
            </NavLink>

            <Button
              url="/submit"
              title="Post your program"
              sx="md:text-lg self-start"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

const NavLink = ({ href, mobileOnly, children }) => {
  return (
    <Link href={href}>
      <a
        className={`${
          mobileOnly ? 'md:hidden' : ''
        } font-heading text-lg leading-none text-white capitalize hover:opacity-75`}
      >
        {children}
      </a>
    </Link>
  );
};
