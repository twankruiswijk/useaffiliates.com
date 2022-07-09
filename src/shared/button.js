import Link from 'next/link';

export default function Button({ url, title, outline, sx, blank }) {
  const typeStyles = outline
    ? 'border border-black	hover:text-white'
    : 'bg-black text-white';

  return (
    <Link href={url}>
      <a
        target={blank ? '_blank' : '_self'}
        rel={blank ? 'noopener noreferrer nofollow' : null}
        className={`inline-block px-6 py-3 rounded shadow-button font-heading text-bold text-center transition hover:bg-black/90 ${typeStyles} ${sx}`}
      >
        {title}
      </a>
    </Link>
  );
}
