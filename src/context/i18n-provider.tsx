'use client';

import { createContext, useContext, ReactNode } from 'react';

type I18nContextType = {
  dict: any; // You can create a more specific type for your dictionary
  lang: string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
  children,
  dictionary,
  lang,
}: {
  children: ReactNode;
  dictionary: any;
  lang: string;
}) {
  return (
    <I18nContext.Provider value={{ dict: dictionary, lang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
