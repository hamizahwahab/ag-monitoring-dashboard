'use client';

import { useState, useEffect, useRef } from 'react';
import NotificationPanel from '@/components/NotificationPanel';
import Siren from '@/components/Siren';
import { API_URL } from '@/config/api';

interface Notification {
  id: number;
  notification_id?: string;
  title: string;
  message: string;
  priority: 'critical' | 'warning' | 'info';
  created_at: string;
}

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const lastFetchedIds = useRef<Set<number>>(new Set());

  // Fetch initial notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) return;
      
      const data = await response.json();
      
      let newNotifications: Notification[] = [];
      
      if (Array.isArray(data)) {
        newNotifications = data;
      }
      
      // Check for new notifications (for siren)
      const hasNewNotifications = newNotifications.some(n => !lastFetchedIds.current.has(n.id));
      
      if (hasNewNotifications && notifications.length > 0) {
        playSiren();
      }
      
      // Update last fetched IDs
      newNotifications.forEach(n => lastFetchedIds.current.add(n.id));
      
      setNotifications(newNotifications);
      
    } catch (err) {
      console.log('Fetching notifications:', err);
    }
  };

  // Play siren sound
  const playSiren = () => {
    // Siren component handles this
  };

  useEffect(() => {
    // Initial fetch
     
    fetchNotifications();
    
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.onNewNotification((notification: Notification) => {
        setNotifications(prev => {
          if (prev.some(n => n.id === notification.id)) {
            return prev;
          }
          playSiren();
          return [notification, ...prev];
        });
      });
      
      window.electronAPI.onRefreshNotifications(() => {
        fetchNotifications();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col h-screen bg-[#050505] text-white overflow-hidden select-none">
      <Siren />
      
      <div className="flex flex-1 overflow-hidden">
        {/* MAIN CONTENT (Left 75%) - Empty */}
        <div className="w-[75%] bg-[#0a0a0a]">
        </div>
        
        {/* NOTIFICATION SIDEBAR (Right 25%) */}
        <aside className="w-[25%] flex flex-col bg-[#0d0d0d] border-l border-white/3 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <NotificationPanel notifications={notifications} />
        </aside>
      </div>
    </main>
  );
}