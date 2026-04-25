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

interface Crisis {
  id: number;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'resolved';
  created_at: string;
}

interface ElectronAPI {
  getNotifications: () => Promise<Notification[]>;
  addNotification: (notification: { title: string; message: string; priority: string }) => Promise<Notification>;
  deleteNotification: (id: number) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  onNewNotification: (callback: (notification: Notification) => void) => void;
  onRefreshNotifications: (callback: () => void) => void;
  removeNewNotificationListener: () => void;
  getCrises: () => Promise<Crisis[]>;
  addCrisis: (crisis: { title: string; description: string; severity?: 'high' | 'medium' | 'low' }) => Promise<Crisis>;
  deleteCrisis: (id: number) => Promise<void>;
  onNewCrisis: (callback: (crisis: Crisis) => void) => void;
  onRefreshCrises: (callback: () => void) => void;
  removeNewCrisisListener: () => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}