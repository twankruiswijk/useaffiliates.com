import { useState, createContext, useContext } from 'react';

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
  const [category, setCategory] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [cookiePeriod, setCookiePeriod] = useState('');

  const updateCategory = (v) => {
    setCategory(v);
  };

  const updatePaymentType = (v) => {
    setPaymentType(v);
  };

  const updateCookiePeriod = (v) => {
    setCookiePeriod(v);
  };

  const value = {
    category,
    paymentType,
    cookiePeriod,
    updateCategory,
    updatePaymentType,
    updateCookiePeriod,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
