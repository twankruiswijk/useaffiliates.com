import { useState, createContext, useContext } from 'react';
import { useRouter } from 'next/router';

const filterContextDefaultValues = {
  category: '',
  paymentType: '',
  cookiePeriod: '',
  updateCategory: () => {},
  updatePaymentType: () => {},
  updateCookiePeriod: () => {},
};

const FilterContext = createContext(filterContextDefaultValues);

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const router = useRouter();

  const [category, setCategory] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [cookiePeriod, setCookiePeriod] = useState('');

  const clearFilters = (omitCategory) => {
    if (!omitCategory) {
      setCategory('');
    }

    setPaymentType('');
    setCookiePeriod('');

    if (router.pathname === '/') {
      router.push(
        {
          pathname: router.pathname,
          query: {},
        },
        undefined,
        { shallow: true },
      );
      return;
    }

    if (omitCategory) {
      router.push(
        {
          pathname: `/programs/${category}`,
          query: {},
        },
        undefined,
        { shallow: true },
      );
      return;
    }

    router.push({
      pathname: '/',
      query: {},
    });
  };

  const updateCategory = (v, setDefault) => {
    setCategory(v);

    if (setDefault) {
      return;
    }

    if (v === '') {
      router.push({
        pathname: '/',
        query: {
          ...(cookiePeriod ? { cookiePeriod } : {}),
          ...(paymentType ? { paymentType } : {}),
        },
      });
    }

    router.push({
      pathname: `/programs/${encodeURIComponent(v)}`,
      query: {
        ...(cookiePeriod ? { cookiePeriod } : {}),
        ...(paymentType ? { paymentType } : {}),
      },
    });
  };

  const updatePaymentType = (v, setDefault) => {
    setPaymentType(v);

    if (setDefault) {
      return;
    }

    if (category) {
      router.push(
        {
          pathname: `/programs/${encodeURIComponent(category)}`,
          query: {
            ...(cookiePeriod ? { cookiePeriod } : {}),
            paymentType: v,
          },
        },
        undefined,
        { shallow: true },
      );
      return;
    }

    router.push(
      {
        pathname: '/',
        query: {
          ...(cookiePeriod ? { cookiePeriod } : {}),
          paymentType: v,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const updateCookiePeriod = (v, setDefault) => {
    setCookiePeriod(v);

    if (setDefault) {
      return;
    }

    if (category) {
      router.push(
        {
          pathname: `/programs/${encodeURIComponent(category)}`,
          query: {
            cookiePeriod: v,
            ...(paymentType ? { paymentType } : {}),
          },
        },
        undefined,
        { shallow: true },
      );
      return;
    }

    router.push(
      {
        pathname: '/',
        query: {
          cookiePeriod: v,
          ...(paymentType ? { paymentType } : {}),
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const value = {
    category,
    paymentType,
    cookiePeriod,
    updateCategory,
    updatePaymentType,
    updateCookiePeriod,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
