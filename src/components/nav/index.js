import { useState } from 'react';
import Link from 'next/link';

import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Nav() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const mobileMediaQuery = useMediaQuery('(max-width: 768px)');
  const isMobile = menuIsOpen && mobileMediaQuery;

  const mobileMenuClasses =
    'absolute lef-0 right-0 top-[76px] flex flex-col bg-primary space-y-4 w-full px-4 pb-4 shadow-[0_4px_4px_-4px,rgba(0,0,0,0.15)]';

  return (
    <header className={isMobile ? 'bg-primary' : ''}>
      <div className="container">
        <nav className="grid--default items-center py-4">
          <div className="col-span-6 md:col-span-3">
            <Link href="/">
              <a className="font-heading text-white font-extrabold text-sm md:text-base">
                $ useaffiliates.com
              </a>
            </Link>
          </div>

          <div className="md:hidden flex justify-end col-start-7 col-span-6">
            <button
              className="w-36 py-2 border-2 text-white rounded font-heading font-semibold"
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
            <NavLink href="#">about</NavLink>
            <NavLink href="#">contact</NavLink>

            <Link href="#">
              <a className="self-start text-heading text-base md:text-lg font-bold shadow-button bg-black text-white px-7 py-3.5 rounded hover:bg-black/[0.9]">
                Post a program
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="font-heading text-lg md:text-base text-white capitalize hover:opacity-75">
        {children}
      </a>
    </Link>
  );
};
