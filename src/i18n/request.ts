import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // all we support for now
  const locale = 'en';

  return {
    locale,
    messages: (await import(`../../lang/${locale}.json`)).default
  };
});
