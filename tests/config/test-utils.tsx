import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../lang/en.json';

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <NextIntlClientProvider locale='en' messages={messages}>
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
