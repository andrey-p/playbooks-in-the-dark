'use client';

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode
} from 'react';

type Theme = 'light' | 'dark';

type ContextValue = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

type Props = {
  children: ReactNode;
};

export const Context = createContext<ContextValue>({
  theme: 'dark',
  setTheme: () => {}
});

export const Provider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const html = document.querySelector('html');

    if (html) {
      html.dataset.theme = theme;
    }
  }, [theme]);

  return (
    <Context.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {children}
    </Context.Provider>
  );
};
