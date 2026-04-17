'use client';

import NotificationCard from './NotificationCard';

interface Notification {
  id: number;
  notification_id?: string;
  title: string;
  message: string;
  created_at: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
}

export default function NotificationPanel({ notifications }: NotificationPanelProps) {
  return (
    <div className="h-full overflow-y-auto p-4 bg-[#0d0d0d] custom-scrollbar">
      <h2 className="text-lg font-bold text-white/70 mb-4 border-b border-white/[0.1] pb-2">
        NOTIFICATION
      </h2>
      
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center text-base text-white/40 py-8">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              title={notification.title}
              message={notification.message}
              createdAt={notification.created_at}
            />
          ))
        )}
      </div>
    </div>
  );
}