import Link from 'next/link';

export default function Button({ url, title, sx, blank }) {
  return (
    <Link href={url}>
      <a
        target={blank ? '_blank' : '_self'}
        rel={blank ? 'noopener noreferrer nofollow' : null}
        className={`inline-block bg-black text-white px-6 py-3 rounded shadow-button font-heading text-bold transition hover:bg-black/90 ${sx}`}
      >
        {title}
      </a>
    </Link>
  );
}
