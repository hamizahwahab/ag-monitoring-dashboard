const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getNotifications: () => ipcRenderer.invoke('db:getNotifications'),
  addNotification: (notification) => ipcRenderer.invoke('db:addNotification', notification),
  deleteNotification: (id) => ipcRenderer.invoke('db:deleteNotification', id),
  clearAllNotifications: () => ipcRenderer.invoke('db:clearAll'),
  onNewNotification: (callback) => {
    ipcRenderer.on('notification:new', (event, notification) => callback(notification));
  },
  onRefreshNotifications: (callback) => {
    ipcRenderer.on('notification:refresh', () => callback());
  },
  removeNewNotificationListener: () => {
    ipcRenderer.removeAllListeners('notification:new');
    ipcRenderer.removeAllListeners('notification:refresh');
  },
});