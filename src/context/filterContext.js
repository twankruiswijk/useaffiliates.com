import { useState, createContext, useContext, useEffect, useRef } from 'react';
import Router from 'next/router';

const filterContextDefaultValues = {
  filters: {
    category: '',
    paymentType: '',
    cookiePeriod: '',
  },
  updateFilters: () => {},
  clearFilters: () => {},
};

const FilterContext = createContext(filterContextDefaultValues);

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({});
  const prevFilters = useRef();

  useEffect(() => {
    const { category, paymentType, cookiePeriod } = filters;

    if (JSON.stringify(prevFilters.current) === JSON.stringify(filters)) {
      return;
    }

    prevFilters.current = filters;

    if (category) {
      return Router.push(
        {
          pathname: `/programs/${encodeURIComponent(category)}`,
          query: {
            ...(paymentType ? { paymentType } : {}),
            ...(cookiePeriod ? { cookiePeriod } : {}),
          },
        },
        undefined,
        { shallow: Router.query.category === filters.category },
      );
    }

    Router.push(
      {
        pathname: '/',
        query: {
          ...filters,
        },
      },
      undefined,
      { shallow: Router.pathname === '/' },
    );
  }, [filters]);

  const updateFilters = ({
    category = undefined,
    paymentType = undefined,
    cookiePeriod = undefined,
  } = {}) => {
    setFilters({
      ...filters,
      ...(category ? { category } : {}),
      ...(paymentType ? { paymentType } : {}),
      ...(cookiePeriod ? { cookiePeriod } : {}),
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const value = {
    category: filters.category || '',
    paymentType: filters.paymentType || '',
    cookiePeriod: filters.cookiePeriod || '',
    updateFilters,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
