import { useEffect, useState } from 'react';

// Custom hook to debounce a value
export const useDebounce = <T>(value: T, delay: number): T => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

     // Cleanup function to clear the timeout if component unmounts or the value/delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};