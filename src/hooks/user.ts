import { useContext } from 'react';
import { Context } from '../main';

// Custom hook to access user context
export const useUser = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context is not defined');
  }

  return context.user;
};