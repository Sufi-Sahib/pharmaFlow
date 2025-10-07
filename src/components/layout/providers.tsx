'use client';

import { Toaster } from '@/components/ui/toaster';
import { GeoProvider } from '@/context/geo-provider';
import { I18nProvider } from '@/context/i18n-provider';
import { getDictionary } from '@/lib/get-dictionary';
import { useEffect, useState } from 'react';

export function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const [dictionary, setDictionary] = useState<any | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration =>
          console.log('Service Worker registered with scope:', registration.scope)
        )
        .catch(error =>
          console.error('Service Worker registration failed:', error)
        );
    }
  }, []);

  useEffect(() => {
    getDictionary(lang).then(setDictionary);
  }, [lang]);

  if (!dictionary) return null;

  return (
    <I18nProvider dictionary={dictionary} lang={lang}>
      <GeoProvider>
        {children}
        <Toaster />
      </GeoProvider>
    </I18nProvider>
  );
}
