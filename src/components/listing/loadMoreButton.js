export default function LoadMoreButton({ isLoading, onLoadMore }) {
  const buttonStyles = `bg-primary text-white font-medium w-full md:w-[unset] min-w-[14rem] py-3.5 rounded shadow-button transition hover:bg-primary/90 ${
    isLoading && 'bg-primary/75'
  }`;
  const buttonText = isLoading ? 'Loading...' : 'Load more programs';

  return (
    <button
      aria-label="load more affiliate programs"
      className={buttonStyles}
      onClick={onLoadMore}
      disabled={isLoading}
    >
      {buttonText}
    </button>
  );
}
