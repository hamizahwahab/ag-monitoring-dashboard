// API Configuration
// Change these values to connect to your notification source

export const API_CONFIG = {
  // Your local HTTP server (Electron runs on port 8001)
  // Examples:
  // - Local: 'http://localhost:8001'
  // - Your IP (same network): 'http://192.168.x.x:8001'
  // - Friend sends to YOUR IP: 'http://YOUR_PC_IP:8001'
  BASE_URL: 'http://localhost:8001',
  
  // Endpoint path
  ENDPOINT: '/api/notifications',
  
  // Poll interval in milliseconds (5000 = 5 seconds)
  // Set to 0 for push mode only, or > 0 for polling fallback
  POLL_INTERVAL: 60000,
};

// Full API URL - don't change this
export const API_URL = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINT;