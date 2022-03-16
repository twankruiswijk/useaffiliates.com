import Link from 'next/link';

export default function Nav() {
  return (
    <header>
      <div className="container">
        <nav className="grid--default items-center py-4">
          <div className="col-span-6 md:col-span-3">
            <Link href="/">
              <a className="font-heading text-white font-extrabold font-base">
                $ useaffiliates.com
              </a>
            </Link>
          </div>

          <div className="hidden md:flex col-start-5 col-span-8 lg:col-start-7 lg:col-span-6 space-x-6 items-center justify-end">
            <NavLink href="#">about</NavLink>
            <NavLink href="#">blog</NavLink>
            <NavLink href="#">contact</NavLink>

            <Link href="#">
              <a className="text-heading font-bold bg-black text-white px-7 py-3.5 rounded-sm hover:bg-black/[0.9]">
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
      <a className="font-heading text-base text-white capitalize hover:opacity-75">
        {children}
      </a>
    </Link>
  );
};
