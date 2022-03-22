export default function LoadMoreButton({ isLoading, onLoadMore }) {
  const buttonStyles = `bg-primary text-white font-semibold min-w-[14rem] py-3.5 rounded shadow-button ${
    isLoading && 'bg-primary/75'
  }`;
  const buttonText = isLoading ? 'Loading...' : 'Load more programs';

  return (
    <button className={buttonStyles} onClick={onLoadMore} disabled={isLoading}>
      {buttonText}
    </button>
  );
}
