import { useEffect, useState } from 'react';
import { syncWithCloud } from './storage';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator !== 'undefined') return navigator.onLine;
    return true;
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [justSyncedCount, setJustSyncedCount] = useState<number | null>(null);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      // Auto cloud synchronization when reconnected!
      setIsSyncing(true);
      const res = await syncWithCloud();
      setIsSyncing(false);
      if (res.syncedCount > 0) {
        setJustSyncedCount(res.syncedCount);
        setTimeout(() => setJustSyncedCount(null), 4000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const manualSync = async () => {
    if (!isOnline) {
      return { success: false, syncedCount: 0, isOnline: false };
    }
    setIsSyncing(true);
    const res = await syncWithCloud();
    setIsSyncing(false);
    if (res.syncedCount > 0) {
      setJustSyncedCount(res.syncedCount);
      setTimeout(() => setJustSyncedCount(null), 4000);
    }
    return { success: res.success, syncedCount: res.syncedCount, isOnline: true };
  };

  return { isOnline, isSyncing, justSyncedCount, manualSync };
}
