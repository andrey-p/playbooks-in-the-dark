'use client';

import { IconContext } from 'react-icons';

export const Context = IconContext;

type Props = {
  children: React.ReactNode;
};

export const Provider = (props: Props) => {
  const { children } = props;

  return (
    <IconContext.Provider
      value={{
        // the icons will always be in a better-labelled element
        attr: { role: 'presentation' }
      }}
    >
      {children}
    </IconContext.Provider>
  );
};
