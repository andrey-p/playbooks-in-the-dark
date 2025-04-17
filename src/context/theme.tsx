'use client';

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode
} from 'react';

type Theme = 'light' | 'dark';

type ContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type Props = {
  children: ReactNode;
  initialTheme: Theme;
};

export const Context = createContext<ContextValue>({
  theme: 'dark',
  setTheme: () => {}
});

export const Provider = ({ children, initialTheme }: Props) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const html = document.querySelector('html');

    if (html) {
      html.dataset.theme = theme;
    }
  }, [theme]);

  const setThemeAndCookie = useCallback((nextTheme: Theme) => {
    setTheme(nextTheme);

    // setting cookies like this wholesale is fine for now
    // can't really imagine needing cookies for anything else
    document.cookie = `theme=${nextTheme};maxAge=31536000`;
  }, []);

  return (
    <Context.Provider
      value={{
        theme,
        setTheme: setThemeAndCookie
      }}
    >
      {children}
    </Context.Provider>
  );
};
