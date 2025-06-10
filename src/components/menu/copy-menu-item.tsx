import { useEffect, useState } from 'react';
import { getEnvVar } from '@/lib/env';
import BaseMenuItem from './base-menu-item';
import { useTranslations } from 'next-intl';

type Props = {
  path: string;
  text: string;
};

export default function CopyMenuItem(props: Props) {
  const { path, text } = props;
  const [justCopied, setJustCopied] = useState<boolean>(false);
  const t = useTranslations('UI.Menu');

  const copyLink = async () => {
    const baseUrl = await getEnvVar('APP_URL');
    const shareableUrl = `${baseUrl}/${path}`;
    await navigator.clipboard.writeText(shareableUrl);

    setJustCopied(true);
  };

  useEffect(() => {
    if (!justCopied) {
      return;
    }

    const timeout = setTimeout(() => setJustCopied(false), 5000);

    return () => {
      clearTimeout(timeout);
      setJustCopied(false);
    };
  }, [justCopied]);

  return (
    <BaseMenuItem
      buttonProps={{
        onClick: copyLink
      }}
      secondaryContent={t('copied')}
      showSecondaryContent={justCopied}
    >
      {text}
    </BaseMenuItem>
  );
}
