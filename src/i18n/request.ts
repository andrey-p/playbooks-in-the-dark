import { getRequestConfig } from 'next-intl/server';
import { getAllSystemsText } from '@/lib/system-data';

export default getRequestConfig(async () => {
  // all we support for now
  const locale = 'en';

  const uiMessages = (await import(`@/../lang/${locale}.json`)).default;
  const systemMessages = await getAllSystemsText(locale);

  // the Modules namespace is only ever used for while the editor is open
  // loading them is overkill for the selection screens
  Object.values(systemMessages).forEach((messages) => {
    delete messages.Modules;
  });

  const messages = {
    ...uiMessages,
    ...systemMessages
  };

  return {
    locale,
    messages
  };
});
