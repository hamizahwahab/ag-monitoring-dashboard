'use client';

import NotificationCard from './NotificationCard';
import { NotificationPanelProps } from '@/types';

export default function NotificationPanel({ notifications }: NotificationPanelProps) {
  // Duplicate notifications for seamless looping
  const duplicatedNotifications = [...notifications, ...notifications];

  return (
    <div className="h-full bg-tv-panel">
      <div className="px-3 py-3 border-b border-white/10">
        <h2 className="text-base font-bold text-white/70">
          NOTIFICATION
        </h2>
      </div>
      
      <div className="overflow-hidden h-[calc(100%-50px)]">
        {notifications.length === 0 ? (
          <div className="text-center text-base text-white/40 py-8">
            No notifications
          </div>
        ) : (
          <div className="notification-carousel space-y-2">
            {duplicatedNotifications.map((notification, index) => (
              <NotificationCard
                key={`${notification.id}-${index}`}
                title={notification.title}
                message={notification.message}
                createdAt={notification.created_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}