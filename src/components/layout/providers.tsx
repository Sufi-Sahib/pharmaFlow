'use client';

import { Toaster } from '@/components/ui/toaster';
import { GeoProvider } from '@/context/geo-provider';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) =>
          console.log('Service Worker registered with scope:', registration.scope)
        )
        .catch((error) =>
          console.error('Service Worker registration failed:', error)
        );
    }
  }, []);

  return (
    <GeoProvider>
      {children}
      <Toaster />
    </GeoProvider>
  );
}
