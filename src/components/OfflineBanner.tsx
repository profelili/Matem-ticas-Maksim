import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getLastSyncTime } from '../utils/storage';
import { Translations } from '../utils/i18n';

interface OfflineBannerProps {
  isOnline: boolean;
  isSyncing: boolean;
  justSyncedCount: number | null;
  onManualSync: () => void;
  t: Translations;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOnline,
  isSyncing,
  justSyncedCount,
  onManualSync,
  t,
}) => {
  const lastSync = getLastSyncTime();

  if (isOnline && !isSyncing && justSyncedCount === null) {
    return null; // Quiet when nominal online
  }

  return (
    <div className="w-full bg-slate-800/95 dark:bg-slate-950/95 text-slate-200 border-b border-slate-700/60 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {!isOnline ? (
            <>
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-amber-300 font-semibold">{t.offlineTitle}</strong> {t.offlineDesc}
              </span>
            </>
          ) : isSyncing ? (
            <>
              <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
              <span>{t.syncingMsg}</span>
            </>
          ) : justSyncedCount !== null ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {t.syncedSuccess} ({justSyncedCount} {justSyncedCount === 1 ? 'registro' : 'registros'}).
              </span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.onlineMsg} · {lastSync}</span>
            </>
          )}
        </div>

        {isOnline && (
          <button
            onClick={onManualSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white transition text-xs whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            {t.syncNow}
          </button>
        )}
      </div>
    </div>
  );
};
