import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { ThemeContext } from '@/context';
import { getFontClassName } from './fonts';

export const metadata: Metadata = {
  title: 'Playbooks in the Dark',
  description: 'A modular character builder for Forged in the Dark games'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeVal = cookieStore.get('theme')?.value;

  const locale = await getLocale();

  // because of course dark theme is default
  const initialTheme = themeVal === 'light' ? 'light' : 'dark';

  return (
    <html lang={locale} data-theme={initialTheme}>
      <body className={getFontClassName()}>
        <NextIntlClientProvider>
          <ThemeContext.Provider initialTheme={initialTheme}>
            {children}
          </ThemeContext.Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
