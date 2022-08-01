import { CheckMarkIcon, CrossMarkIcon } from 'lib/icons';

export default function CookiePeriod({
  showLabel,
  period,
  iconClasses = 'h-5 w-5 mr-1.5',
}) {
  if (!period) {
    return (
      <div className="flex items-center">
        {showLabel && (
          <span className="font-semibold mr-1.5">Has cookie: </span>
        )}
        <CrossMarkIcon classNames={iconClasses} />
        no cookie
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {showLabel && <span className="font-semibold mr-1.5">Has cookie: </span>}
      <CheckMarkIcon classNames={iconClasses} />
      {period} {period > 1 ? 'days' : 'day'}
    </div>
  );
}
