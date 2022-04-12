import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CrossMarkIcon } from 'lib/icons';

export default function SnackBar({ id, message, linkUrl }) {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const localStorgeItem = JSON.parse(localStorage.getItem(id));

    if (localStorgeItem === null) {
      setShowSnackbar(true);
    }
  }, [id]);

  const handleClose = () => {
    setShowSnackbar(false);
    localStorage.setItem(id, JSON.stringify(false));
  };

  if (!showSnackbar) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded shadow-lg bg-primary border border-yellow-400 w-[40rem] max-w-[96%]">
      <div className="flex items-center justify-between text-white font-heading text-sm md:text-base">
        <Link href={linkUrl}>
          <a
            className="leading-relaxed underline underline-offset-1"
            onClick={handleClose}
          >
            {message}
          </a>
        </Link>

        <button onClick={handleClose}>
          <CrossMarkIcon classNames="w-5 h-5 fill-white" />
        </button>
      </div>
    </div>
  );
}
