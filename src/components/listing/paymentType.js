import {
  RecurringIcon,
  QuestionMarkIcon,
  PaymentIcon,
  CoinIcon,
  CreditCardIcon,
} from '@/lib/icons';

export default function PaymentType({
  showLabel,
  type,
  iconClasses = 'h-5 w-5 mr-1.5 fill-zinc-800',
}) {
  const getPaymentTypeMeta = () => {
    switch (type) {
      case 'weekly':
        return {
          icon: <RecurringIcon classNames={iconClasses} />,
          label: 'Weekly',
        };
      case 'monthly':
        return {
          icon: <RecurringIcon classNames={iconClasses} />,
          label: 'Monthly',
        };
      case 'one-time':
        return {
          icon: <CreditCardIcon classNames={iconClasses} />,
          label: 'One-time',
        };
      case 'credits':
        return {
          icon: <CoinIcon classNames={iconClasses} />,
          label: 'Credits',
        };
      case 'multiple':
        return {
          icon: <PaymentIcon classNames={iconClasses} />,
          label: 'Multiple',
        };
      default:
        return {
          icon: <QuestionMarkIcon classNames={iconClasses} />,
          label: 'Unkown',
        };
    }
  };

  return (
    <div className="flex items-center">
      {showLabel && (
        <span className="font-semibold mr-1.5">Payment type: </span>
      )}
      {getPaymentTypeMeta().icon}
      {getPaymentTypeMeta().label}
    </div>
  );
}
