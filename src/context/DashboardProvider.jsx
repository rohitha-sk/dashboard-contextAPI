import React, { createContext, useState } from 'react'


const DashboardContext = createContext();

function DashboardProvider({children}) {

    const [theme, setTheme] = useState({
    primaryColor: 'blue',
    fontSize: 'medium',
    borderRadius: 'rounded',
    animationSpeed: 'normal'
  });
  
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to the app!', read: false, priority: 'high' },
    { id: 2, message: 'New feature available', read: false, priority: 'medium' },
    { id: 3, message: 'System update completed', read: true, priority: 'low' }
  ]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');

  const toggleThemeColor = () => {
    setTheme(prev => ({
      ...prev,
      primaryColor: prev.primaryColor === 'blue' ? 'purple' : prev.primaryColor === 'purple' ? 'green' : 'blue'
    }));
  };

  const changeFontSize = (size) => {
    setTheme(prev => ({ ...prev, fontSize: size }));
  };

  const toggleBorderRadius = () => {
    setTheme(prev => ({
      ...prev,
      borderRadius: prev.borderRadius === 'rounded' ? 'square' : 'rounded'
    }));
  };

  const changeAnimationSpeed = (speed) => {
    setTheme(prev => ({ ...prev, animationSpeed: speed }));
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const addNotification = () => {
    const messages = [
      'New message received',
      'Task completed successfully',
      'Meeting reminder',
      'Download finished',
      'Profile updated'
    ];
    const priorities = ['low', 'medium', 'high'];
    
    const newNotif = {
      id: Date.now(),
      message: messages[Math.floor(Math.random() * messages.length)],
      read: false,
      priority: priorities[Math.floor(Math.random() * priorities.length)]
    };
    
    setNotifications(prev => [newNotif, ...prev]);
  };


  return (
   <DashboardContext.Provider value={{
    theme,
    notifications,
    isCollapsed,
    filterPriority,
    toggleThemeColor,
    changeFontSize,
    toggleBorderRadius,
    changeAnimationSpeed,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    setIsCollapsed,
    setFilterPriority,
   }}>
    {children}
   </DashboardContext.Provider>
  )
}

export {DashboardProvider,DashboardContext}