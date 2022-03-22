export default function Footer() {
  return (
    <footer className="pt-20 pb-8">
      <div className="container">
        <div className="flex flex-col md:flex-row md:justify-between">
          <span className="text-zinc-500 mb-2 md:mb-0 text-sm">
            All rights reserved &copy; useaffiliates.com
            {' ' + new Date().getFullYear()}
          </span>

          <a
            href="https://twankrui.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-zinc-500 font-semibold underline text-sm"
          >
            By twankrui (t-arch)
          </a>
        </div>
      </div>
    </footer>
  );
}
