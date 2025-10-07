
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bell, BellOff } from 'lucide-react';

async function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        setRegistration(reg);
        reg.pushManager.getSubscription().then(sub => {
          if (sub) {
            setIsSubscribed(true);
            setSubscription(sub);
          }
        });
      });
    }
  }, []);

  const subscribeButtonOnClick = async () => {
    if (!registration) {
        toast({ title: 'Error', description: 'Service Worker not ready.', variant: 'destructive'});
        return;
    }

    if (isSubscribed) {
      // Unsubscribe
      await subscription?.unsubscribe();
      // Here you would send a request to your server to delete the subscription
      console.log('User IS unsubscribed.');
      setIsSubscribed(false);
      setSubscription(null);
      toast({ title: 'Unsubscribed', description: 'You will no longer receive push notifications.' });
    } else {
      // Subscribe
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        toast({ title: 'Configuration Error', description: 'VAPID public key is not set.', variant: 'destructive' });
        console.error('VAPID public key is not set. Set NEXT_PUBLIC_VAPID_PUBLIC_KEY in your .env.local file.');
        return;
      }
      
      const convertedVapidKey = await urlBase64ToUint8Array(vapidPublicKey);
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      // Here you would send the subscription object to your server
      console.log('User is subscribed:', sub);
      // Example of sending to a mock server endpoint
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify(sub),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      
      setIsSubscribed(true);
      setSubscription(sub);
      toast({ title: 'Subscribed!', description: 'You will now receive push notifications.' });
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={subscribeButtonOnClick}>
      {isSubscribed ? <BellOff /> : <Bell />}
      <span className="sr-only">Toggle Notifications</span>
    </Button>
  );
}
