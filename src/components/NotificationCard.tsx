interface NotificationCardProps {
  id?: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function NotificationCard({ title, message, createdAt }: NotificationCardProps) {
  const time = new Date(createdAt).toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="notification-card critical">
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs opacity-80 mb-2">{message}</p>
      <span className="text-[10px] text-white/50">{time}</span>
    </div>
  );
}