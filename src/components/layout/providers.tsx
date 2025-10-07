'use client';

import { Toaster } from '@/components/ui/toaster';
import { GeoProvider } from '@/context/geo-provider';
import { I18nProvider } from '@/context/i18n-provider';
import { useEffect } from 'react';
import { PageTransitionLoader } from './page-transition-loader';

export function Providers({
  children,
  lang,
  dictionary,
}: {
  children: React.ReactNode;
  lang: string;
  dictionary: any;
}) {
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

  if (!dictionary) return null;

  return (
    <I18nProvider dictionary={dictionary} lang={lang}>
      <GeoProvider>
        <PageTransitionLoader />
        {children}
        <Toaster />
      </GeoProvider>
    </I18nProvider>
  );
}
