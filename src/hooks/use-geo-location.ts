
"use client";

import { useState, useEffect, useCallback } from 'react';
import { addToQueue, getQueuedEvents, removeFromQueue } from '@/lib/db';

type GeoLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
};

type StampedAction = {
    actionType: string;
    payload: any;
    geoLocation: GeoLocation | { error: string };
    timestamp: number;
    id: string;
};

// Mock server request
async function sendToServer(data: StampedAction): Promise<{success: boolean}> {
    console.log("Sending to server:", data);
    // In a real app, this would be a fetch call to your backend
    // For this demo, we'll simulate a 50% chance of failure if online
    return new Promise(resolve => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                console.log("Server request successful");
                resolve({ success: true });
            } else {
                console.log("Server request failed");
                resolve({ success: false });
            }
        }, 1000);
    });
}


export function useGeoLocation() {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);


  const syncOfflineEvents = useCallback(async (retryCount = 0) => {
    if (isSyncing) return;
    setIsSyncing(true);
    console.log("Starting sync process...");

    try {
        const queuedEvents = await getQueuedEvents();
        if (queuedEvents.length === 0) {
            console.log("No events to sync.");
            setIsSyncing(false);
            return;
        }
        
        console.log(`Found ${queuedEvents.length} events to sync.`);

        for (const event of queuedEvents) {
            const { success } = await sendToServer(event);
            if (success) {
                await removeFromQueue(event.id);
                console.log(`Event ${event.id} synced and removed from queue.`);
            } else {
                 throw new Error("Sync failed, will retry later.");
            }
        }
    } catch (e: any) {
        console.error(e.message);
        const maxRetries = 5;
        if (retryCount < maxRetries) {
            const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
            console.log(`Retrying sync in ${delay / 1000} seconds...`);
            setTimeout(() => syncOfflineEvents(retryCount + 1), delay);
        } else {
            console.error("Max sync retries reached.");
        }
    } finally {
        setIsSyncing(false);
    }
  }, [isSyncing]);

  useEffect(() => {
    window.addEventListener('online', () => syncOfflineEvents());
    // Attempt a sync on initial load in case we were offline before
    if(navigator.onLine) {
        syncOfflineEvents();
    }
    return () => {
      window.removeEventListener('online', () => syncOfflineEvents());
    };
  }, [syncOfflineEvents]);

  const stampAction = useCallback(async (actionType: string, payload: any) => {
    setLoading(true);
    setError(null);

    const getGeo = (): Promise<GeoLocation | { error: string }> => new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({ error: "Geolocation is not supported by your browser." });
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const loc = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                };
                setLocation(loc);
                resolve(loc);
            },
            (err) => {
                let errorMsg = "An unknown error occurred.";
                 switch (err.code) {
                    case err.PERMISSION_DENIED:
                        errorMsg = "Location permission denied. You can proceed, but the record will be saved without a map pin.";
                        break;
                    case err.POSITION_UNAVAILABLE:
                        errorMsg = "Location information is unavailable.";
                        break;
                    case err.TIMEOUT:
                        errorMsg = "The request to get user location timed out.";
                        break;
                }
                setError(errorMsg);
                resolve({ error: errorMsg });
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    });

    const geoLocation = await getGeo();
    setLoading(false);
    
    const stampedAction: StampedAction = {
        id: crypto.randomUUID(),
        actionType,
        payload,
        geoLocation,
        timestamp: Date.now()
    };

    if (!navigator.onLine) {
        console.log("Offline. Queuing action.");
        await addToQueue(stampedAction);
        return { queued: true };
    }

    try {
        const { success } = await sendToServer(stampedAction);
        if (!success) {
            throw new Error("Server request failed, queuing event.");
        }
        return { success: true };
    } catch (e) {
        console.log("Failed to send to server, queuing action.");
        await addToQueue(stampedAction);
        return { queued: true };
    }

  }, []);

  return { location, error, loading, isSyncing, stampAction };
}
