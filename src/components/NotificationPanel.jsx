import useDashboard from "../context/useDashboard";
import NotificationItem from "./NotificationItem";

// Level 3: NotificationPanel needs theme and notifications
function NotificationPanel() {
  const{ theme, notifications, filterPriority, toggleThemeColor, changeFontSize, toggleBorderRadius, changeAnimationSpeed } = useDashboard();

  
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
              notification={notification} />
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
export default NotificationPanel;