import {
  Goblin_One,
  EB_Garamond,
  Rubik_Dirt,
  Saira_Extra_Condensed
} from 'next/font/google';

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

const rubikDirt = Rubik_Dirt({
  variable: '--font-rubik-dirt',
  subsets: ['latin'],
  weight: '400',
  fallback: ['Impact', 'sans-serif']
});

const sairaExtraCondensed = Saira_Extra_Condensed({
  variable: '--font-saira-extra-condensed',
  subsets: ['latin'],
  weight: '600',
  fallback: ['Impact', 'sans-serif']
});

const fonts = [goblinOne, garamond, rubikDirt, sairaExtraCondensed];

export const getFontClassName = (): string => {
  return fonts.map((font) => font.variable).join(' ');
};
