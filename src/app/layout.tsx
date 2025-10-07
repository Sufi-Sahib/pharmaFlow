import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/providers';
import { i18n } from '../../../i18n.config';

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'PharmaFlow',
  description: 'PharmaFlow MVP by Firebase Studio',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang} dir={params.lang === 'ur' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
      </head>
      <body className="font-body antialiased">
        <Providers lang={params.lang}>{children}</Providers>
      </body>
    </html>
  );
}
