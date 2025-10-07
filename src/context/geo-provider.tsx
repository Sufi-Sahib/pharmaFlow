
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type GeoStatus = 'online' | 'offline' | 'syncing' | 'error';

type GeoLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
};

type GeoContextType = {
  status: GeoStatus;
  setStatus: (status: GeoStatus) => void;
  hasQueuedItems: boolean;
  setHasQueuedItems: (hasItems: boolean) => void;
  lastLocation: GeoLocation | null;
  setLastLocation: (location: GeoLocation | null) => void;
};

const GeoContext = createContext<GeoContextType | undefined>(undefined);

export function GeoProvider({ children }: { children: ReactNode }) {
  const [status, setStatusInternal] = useState<GeoStatus>('online');
  const [hasQueuedItems, setHasQueuedItems] = useState(false);
  const [lastLocation, setLastLocation] = useState<GeoLocation | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setStatus = (newStatus: GeoStatus) => {
    setStatusInternal(newStatus);
  };

  const getDerivedStatus = (): GeoStatus => {
      if (status === 'syncing') return 'syncing';
      if (status === 'error') return 'error';
      if (!isOnline || hasQueuedItems) return 'offline';
      return 'online';
  }


  return (
    <GeoContext.Provider value={{ status: getDerivedStatus(), setStatus, hasQueuedItems, setHasQueuedItems, lastLocation, setLastLocation }}>
      {children}
    </GeoContext.Provider>
  );
}

export function useGeo() {
  const context = useContext(GeoContext);
  if (context === undefined) {
    throw new Error("useGeo must be used within a GeoProvider");
  }
  return context;
}
