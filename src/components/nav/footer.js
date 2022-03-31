import Link from 'next/link';

export default function Footer() {
  const listItemStyles = 'transition hover:text-zinc-700';

  return (
    <footer className="pt-20 pb-8">
      <div className="container">
        <div className="flex flex-col md:flex-row md:justify-between">
          <span className="text-zinc-500 mb-2 md:mb-0 text-sm">
            All rights reserved &copy; useaffiliates.com
            {' ' + new Date().getFullYear()}
          </span>

          <nav>
            <ul className="flex space-x-4 text-sm text-zinc-500">
              <li className={listItemStyles}>
                <Link href="/terms">
                  <a>Terms</a>
                </Link>
              </li>

              <li className={listItemStyles}>
                <Link href="/privacy">
                  <a>Privacy</a>
                </Link>
              </li>

              <li>
                <a
                  href="https://twankrui.com"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-heading font-medium bg-clip-text text-transparent bg-gradient-to-br from-primary to-red-500"
                >
                  made with ♥ by twankrui
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
