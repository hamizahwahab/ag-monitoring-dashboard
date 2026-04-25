/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare global {
  interface Window {
    electronAPI?: {
      getNotifications: () => Promise<any[]>;
      addNotification: (notification: { title: string; message: string; priority: string }) => Promise<any>;
      deleteNotification: (id: number) => Promise<void>;
      clearAllNotifications: () => Promise<void>;
      onNewNotification: (callback: (notification: any) => void) => void;
      onRefreshNotifications: (callback: () => void) => void;
    };
  }
}

export {};