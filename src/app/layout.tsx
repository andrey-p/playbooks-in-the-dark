import type { Metadata } from 'next';
import './globals.css';

import { ThemeContext } from '@/context';
import { getFontClassName } from './fonts';

export const metadata: Metadata = {
  title: 'Playbooks in the Dark',
  description: 'A modular character builder for Forged in the Dark games'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={getFontClassName()}>
        <ThemeContext.Provider>{children}</ThemeContext.Provider>
      </body>
    </html>
  );
}
