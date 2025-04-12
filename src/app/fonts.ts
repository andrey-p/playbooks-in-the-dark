import { Goblin_One, EB_Garamond } from 'next/font/google';

const goblinOne = Goblin_One({
  variable: '--font-goblin-one',
  subsets: ['latin'],
  weight: '400',
  fallback: ['Impact', 'serif']
});

const garamond = EB_Garamond({
  variable: '--font-garamond',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  fallback: ['Times New roman', 'serif']
});

const fonts = [goblinOne, garamond];

export const getFontClassName = (): string => {
  return fonts.map((font) => font.variable).join(' ');
};
