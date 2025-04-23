import { getRequestConfig } from 'next-intl/server';
import systemsJson from '@/systems/systems.json';

export default getRequestConfig(async () => {
  // all we support for now
  const locale = 'en';

  const uiMessages = (await import(`@/../lang/${locale}.json`)).default;

  // TODO this gets all of the translations for all the systems
  // should try to limit those to e.g. system and playbook definitions
  const systemPromises = systemsJson.systems.map(async ({ id }) => {
    return (await import(`@/systems/${id}/lang/${locale}.json`)).default;
  });

  const systemMessages = (await Promise.all(systemPromises)).reduce(
    (acc, data) => {
      return {
        ...acc,
        ...data
      };
    },
    {}
  );

  const messages = {
    ...uiMessages,
    ...systemMessages
  };

  return {
    locale,
    messages
  };
});
