import { StrictMode, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import UserStore from './store/UserStore.ts';

interface ContextProps {
  user: UserStore;
}

export const Context = createContext<ContextProps | null>(null);

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Context.Provider value={{ user: new UserStore() }}>
        <App />
      </Context.Provider>
    </StrictMode>,
  );
} else {
  console.error('Root element not found');
}
