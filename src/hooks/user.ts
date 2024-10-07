import { useContext } from 'react';
import { Context } from '../main';

export const useUser = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context is not defined');
  }

  return context.user;
};