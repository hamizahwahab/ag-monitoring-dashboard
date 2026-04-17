/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface Notification {
  id: number;
  notification_id?: string;
  title: string;
  message: string;
  priority: string;
  created_at: string;
}

interface ElectronAPI {
  getNotifications: () => Promise<Notification[]>;
  addNotification: (notification: { title: string; message: string; priority: string }) => Promise<Notification>;
  deleteNotification: (id: number) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  onNewNotification: (callback: (notification: Notification) => void) => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}