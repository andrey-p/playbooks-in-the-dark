import { getRequestConfig } from 'next-intl/server';
import { getAllSystemsText } from '@/lib/system-data';

export default getRequestConfig(async () => {
  // all we support for now
  const locale = 'en';

  const uiMessages = (await import(`@/../lang/${locale}.json`)).default;

  // TODO this gets all of the translations for all the systems
  // should try to limit those to e.g. system and playbook definitions
  const systemMessages = await getAllSystemsText(locale);

  const messages = {
    ...uiMessages,
    ...systemMessages
  };

  return {
    locale,
    messages
  };
});
