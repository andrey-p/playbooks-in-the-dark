import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import uiMessages from '@/lang/en.json';
import { getAllSystemsText } from '@/lib/system-data';
import { axe, toHaveNoViolations } from 'jest-axe';

let messages: object;
let testTranslations = {};

beforeAll(async () => {
  messages = {
    ...(await getAllSystemsText('en')),
    ...uiMessages,
    ...testTranslations
  };
});

// add ad-hoc translations from within a test
// to check the behaviour of specific translated components
export const addTestTranslations = (extraTranslations: object) => {
  testTranslations = {
    ...testTranslations,
    ...extraTranslations
  };
};

// automated accessbility checks
expect.extend(toHaveNoViolations);

export const testAccessibility = async (container: Element) => {
  const result = await axe(container);

  expect(result).toHaveNoViolations();
};

// only some tests care about the translation warning showing
let isHidingTranslationWarnings = true;
export const showTranslationWarnings = () => {
  isHidingTranslationWarnings = false;
};

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  let onError;

  // sets onError to no-op so it doesn't complain
  if (isHidingTranslationWarnings) {
    onError = () => {};
  }

  return (
    <NextIntlClientProvider locale='en' messages={messages} onError={onError}>
      {children}
    </NextIntlClientProvider>
  );
};

// wrap render with our own providers
// https://testing-library.com/docs/react-testing-library/setup#custom-render
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: Wrapper,
    ...options
  });
};

export * from '@testing-library/react';
export { customRender as render };
