import { useState } from "react";
import useDashboard from "../context/useDashboard";

// Level 4: NotificationItem only needs notification, theme, and actions
function NotificationItem({ notification}) {
  const{theme, markAsRead, deleteNotification } = useDashboard();

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
export default NotificationItem;