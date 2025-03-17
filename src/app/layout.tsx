import type { Metadata } from 'next';
import { Goblin_One, EB_Garamond } from 'next/font/google';
import './globals.css';

const goblinOne = Goblin_One({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
  fallback: ['Impact', 'serif']
});

const garamond = EB_Garamond({
  variable: '--font-text',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  fallback: ['Times New roman', 'serif']
});

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
      <body className={`${goblinOne.variable} ${garamond.variable}`}>
        {children}
      </body>
    </html>
  );
}
