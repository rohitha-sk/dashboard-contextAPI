solving propdrilling problem using contextAPI


<img width="1863" height="868" alt="image" src="https://github.com/user-attachments/assets/d536f4ed-fbad-41a9-bfc3-72c98926df4b" />


Note: This guide focuses on the Context API implementation. UI design is not the primary concern.

Overview
I generated code with prop drilling using Claude AI, then solved it step-by-step using Context API, and finally refactored it into a custom hook.
this is the code before simplifying with contextAPI. after the code, I have explained the process of adding contextAPI step by step.

==========================================================================================
import { useState } from 'react';

// Top level component
function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <Dashboard
        theme={theme}
        notifications={notifications}
        isCollapsed={isCollapsed}
        filterPriority={filterPriority}
        toggleThemeColor={toggleThemeColor}
        changeFontSize={changeFontSize}
        toggleBorderRadius={toggleBorderRadius}
        changeAnimationSpeed={changeAnimationSpeed}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        deleteNotification={deleteNotification}
        addNotification={addNotification}
        setIsCollapsed={setIsCollapsed}
        setFilterPriority={setFilterPriority}
      />
    </div>
  );
}

======================================================================
function Dashboard({ theme, notifications, isCollapsed, filterPriority, toggleThemeColor, changeFontSize, toggleBorderRadius, changeAnimationSpeed, markAsRead, markAllAsRead, deleteNotification, addNotification, setIsCollapsed, setFilterPriority }) {
  const bgColor = theme.primaryColor === 'blue' ? 'bg-blue-50' : theme.primaryColor === 'purple' ? 'bg-purple-50' : 'bg-green-50';
  const borderColor = theme.primaryColor === 'blue' ? 'border-blue-300' : theme.primaryColor === 'purple' ? 'border-purple-300' : 'border-green-300';
  const transitionSpeed = theme.animationSpeed === 'fast' ? 'transition-all duration-150' : theme.animationSpeed === 'normal' ? 'transition-all duration-300' : 'transition-all duration-500';
  
  return (
    <div className={`${bgColor} ${borderColor} border-2 p-6 ${theme.borderRadius === 'rounded' ? 'rounded-2xl' : 'rounded-none'} ${transitionSpeed} shadow-xl`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${theme.primaryColor === 'blue' ? 'text-blue-800' : theme.primaryColor === 'purple' ? 'text-purple-800' : 'text-green-800'} ${transitionSpeed}`}>
          Dashboard Control Center
        </h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`px-4 py-2 ${theme.primaryColor === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : theme.primaryColor === 'purple' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-green-500 hover:bg-green-600'} text-white ${theme.borderRadius === 'rounded' ? 'rounded-lg' : 'rounded-none'} ${transitionSpeed}`}
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
          <span className={`text-sm px-3 py-1 ${theme.primaryColor === 'blue' ? 'bg-blue-200 text-blue-800' : theme.primaryColor === 'purple' ? 'bg-purple-200 text-purple-800' : 'bg-green-200 text-green-800'} ${theme.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'}`}>
            Theme: {theme.primaryColor}
          </span>
        </div>
      </div>
      
      {!isCollapsed && (
        <Sidebar
          theme={theme}
          notifications={notifications}
          filterPriority={filterPriority}
          toggleThemeColor={toggleThemeColor}
          changeFontSize={changeFontSize}
          toggleBorderRadius={toggleBorderRadius}
          changeAnimationSpeed={changeAnimationSpeed}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          deleteNotification={deleteNotification}
          addNotification={addNotification}
          setFilterPriority={setFilterPriority}
        />
      )}
    </div>
  );
}

======================================================================
function Sidebar({ theme, notifications, filterPriority, toggleThemeColor, changeFontSize, toggleBorderRadius, changeAnimationSpeed, markAsRead, markAllAsRead, deleteNotification, addNotification, setFilterPriority }) {
  const unreadCount = notifications.filter(n => !n.read).length;
  const bgColor = theme.primaryColor === 'blue' ? 'bg-blue-100' : theme.primaryColor === 'purple' ? 'bg-purple-100' : 'bg-green-100';
  const transitionSpeed = theme.animationSpeed === 'fast' ? 'transition-all duration-150' : theme.animationSpeed === 'normal' ? 'transition-all duration-300' : 'transition-all duration-500';
  
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className={`lg:col-span-1 ${bgColor} p-4 ${theme.borderRadius === 'rounded' ? 'rounded-xl' : 'rounded-none'} ${transitionSpeed}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${theme.fontSize === 'small' ? 'text-base' : theme.fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
            Navigation
          </h2>
          <div className="flex gap-2">
            <span className={`px-2 py-1 text-xs ${theme.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'} ${theme.primaryColor === 'blue' ? 'bg-blue-500' : theme.primaryColor === 'purple' ? 'bg-purple-500' : 'bg-green-500'} text-white ${transitionSpeed}`}>
              {unreadCount} unread
            </span>
            {highPriorityCount > 0 && (
              <span className={`px-2 py-1 text-xs ${theme.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'} bg-red-500 text-white animate-pulse`}>
                {highPriorityCount} urgent
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <button
            onClick={addNotification}
            className={`w-full py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white ${theme.borderRadius === 'rounded' ? 'rounded-lg' : 'rounded-none'} ${transitionSpeed}`}
          >
            + Add Notification
          </button>
          
          <button
            onClick={markAllAsRead}
            className={`w-full py-2 px-4 ${theme.primaryColor === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : theme.primaryColor === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'} text-white ${theme.borderRadius === 'rounded' ? 'rounded-lg' : 'rounded-none'} ${transitionSpeed}`}
          >
            Mark All Read
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium block">Filter by Priority:</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className={`w-full p-2 border ${theme.primaryColor === 'blue' ? 'border-blue-300' : theme.primaryColor === 'purple' ? 'border-purple-300' : 'border-green-300'} ${theme.borderRadius === 'rounded' ? 'rounded' : 'rounded-none'}`}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <NotificationPanel
          theme={theme}
          notifications={notifications}
          filterPriority={filterPriority}
          toggleThemeColor={toggleThemeColor}
          changeFontSize={changeFontSize}
          toggleBorderRadius={toggleBorderRadius}
          changeAnimationSpeed={changeAnimationSpeed}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
        />
      </div>
    </div>
  );
}

======================================================================
function NotificationPanel({ theme, notifications, filterPriority, toggleThemeColor, changeFontSize, toggleBorderRadius, changeAnimationSpeed, markAsRead, deleteNotification }) {
  const textSize = theme.fontSize === 'small' ? 'text-xs' : theme.fontSize === 'medium' ? 'text-sm' : 'text-base';
  const transitionSpeed = theme.animationSpeed === 'fast' ? 'transition-all duration-150' : theme.animationSpeed === 'normal' ? 'transition-all duration-300' : 'transition-all duration-500';
  
  const filteredNotifications = filterPriority === 'all' 
    ? notifications 
    : notifications.filter(n => n.priority === filterPriority);
  
  return (
    <div className="space-y-4">
      <div className={`p-4 bg-white ${theme.borderRadius === 'rounded' ? 'rounded-xl' : 'rounded-none'} shadow-md ${transitionSpeed}`}>
        <h3 className={`${textSize} font-semibold mb-3`}>Theme Controls</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={toggleThemeColor}
            className={`py-2 px-4 ${theme.primaryColor === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : theme.primaryColor === 'purple' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-green-500 hover:bg-green-600'} text-white ${theme.borderRadius === 'rounded' ? 'rounded-lg' : 'rounded-none'} ${transitionSpeed}`}
          >
            Change Color
          </button>
          
          <button
            onClick={toggleBorderRadius}
            className={`py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white ${theme.borderRadius === 'rounded' ? 'rounded-lg' : 'rounded-none'} ${transitionSpeed}`}
          >
            Toggle Corners
          </button>
        </div>

        <div className="mt-3 space-y-2">
          <label className="text-xs font-medium block">Font Size:</label>
          <div className="flex gap-2">
            {['small', 'medium', 'large'].map(size => (
              <button
                key={size}
                onClick={() => changeFontSize(size)}
                className={`flex-1 py-1 px-2 text-xs ${theme.fontSize === size ? (theme.primaryColor === 'blue' ? 'bg-blue-500' : theme.primaryColor === 'purple' ? 'bg-purple-500' : 'bg-green-500') + ' text-white' : 'bg-gray-200'} ${theme.borderRadius === 'rounded' ? 'rounded' : 'rounded-none'} ${transitionSpeed}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <label className="text-xs font-medium block">Animation Speed:</label>
          <div className="flex gap-2">
            {['slow', 'normal', 'fast'].map(speed => (
              <button
                key={speed}
                onClick={() => changeAnimationSpeed(speed)}
                className={`flex-1 py-1 px-2 text-xs ${theme.animationSpeed === speed ? (theme.primaryColor === 'blue' ? 'bg-blue-500' : theme.primaryColor === 'purple' ? 'bg-purple-500' : 'bg-green-500') + ' text-white' : 'bg-gray-200'} ${theme.borderRadius === 'rounded' ? 'rounded' : 'rounded-none'} ${transitionSpeed}`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className={`${textSize} font-medium mb-3`}>
          Notifications ({filteredNotifications.length})
        </h3>
        <div className="space-y-3">
          {filteredNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              theme={theme}
              markAsRead={markAsRead}
              deleteNotification={deleteNotification}
            />
          ))}
          {filteredNotifications.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No notifications to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

======================================================================
function NotificationItem({ notification, theme, markAsRead, deleteNotification }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const bgColor = notification.read
    ? 'bg-gray-200'
    : theme.primaryColor === 'blue' ? 'bg-blue-100' : theme.primaryColor === 'purple' ? 'bg-purple-100' : 'bg-green-100';
  
  const textColor = notification.read ? 'text-gray-500' : 'text-gray-900';
  const textSize = theme.fontSize === 'small' ? 'text-xs' : theme.fontSize === 'medium' ? 'text-sm' : 'text-base';
  const transitionSpeed = theme.animationSpeed === 'fast' ? 'transition-all duration-150' : theme.animationSpeed === 'normal' ? 'transition-all duration-300' : 'transition-all duration-500';

  const priorityColor = notification.priority === 'high' ? 'bg-red-500' : notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500';

  return (
    <div 
      className={`${bgColor} p-4 ${theme.borderRadius === 'rounded' ? 'rounded-lg' : 'rounded-none'} ${transitionSpeed} ${isHovered ? 'shadow-lg scale-105' : 'shadow'} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 ${priorityColor} ${theme.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'}`}></span>
            <span className="text-xs text-gray-500 uppercase">{notification.priority}</span>
          </div>
          <p className={`${textColor} ${textSize} ${notification.read ? 'line-through' : ''}`}>
            {notification.message}
          </p>
        </div>
        
        <button
          onClick={() => deleteNotification(notification.id)}
          className={`text-red-500 hover:text-red-700 hover:scale-110 ${transitionSpeed}`}
        >
          ✕
        </button>
      </div>
      
      {!notification.read && (
        <button
          onClick={() => markAsRead(notification.id)}
          className={`mt-3 text-xs ${theme.primaryColor === 'blue' ? 'text-blue-700 hover:text-blue-900' : theme.primaryColor === 'purple' ? 'text-purple-700 hover:text-purple-900' : 'text-green-700 hover:text-green-900'} font-medium ${transitionSpeed}`}
        >
          ✓ Mark as read
        </button>
      )}
    </div>
  );
}

export default App;

================================================================================

Step-by-Step Process

Step 1: Create the Context
Create a new file DashboardProvider.jsx inside the context folder.

import { createContext } from 'react';

const DashboardContext = createContext();

 Step 2: Move State and Functions to Provider
Cut all state declarations and functions from App.jsx and paste them into the DashboardProvider component:
export function DashboardProvider({ children }) {
  // All state declarations
  const [theme, setTheme] = useState({...});
  const [notifications, setNotifications] = useState([...]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');

  // All functions
  const toggleThemeColor = () => {...};
  const changeFontSize = (size) => {...};
  const toggleBorderRadius = () => {...};
  const changeAnimationSpeed = (speed) => {...};
  const markAsRead = (id) => {...};
  const markAllAsRead = () => {...};
  const deleteNotification = (id) => {...};
  const addNotification = () => {...};

  return (
    <DashboardContext.Provider 
      value={{
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

Step 3: Create a Custom Hook
Create useDashboard.jsx inside the context folder:
import { useContext } from 'react';
import { DashboardContext } from './DashboardProvider';

export function useDashboard() {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  
  return context;
}

Step 4: Wrap the App component code with Provider
In App.jsx, wrap the components with the provider:
import { DashboardProvider } from './context/DashboardProvider';

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
        <Dashboard />
      </div>
    </DashboardProvider>
  );
}

Step 5: Export Context from Provider
Don't forget to export the context in DashboardProvider.jsx:
export const DashboardContext = createContext();

Step 6: Use the Hook in Components
In each component that needs the data, import and use the custom hook:

import { useDashboard } from './context/useDashboard';

function Dashboard() {
  const { theme, isCollapsed, setIsCollapsed } = useDashboard();
  // Use only what you need - no more prop drilling!
  
  // Component logic...
}
