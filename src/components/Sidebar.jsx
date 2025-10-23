import useDashboard from "../context/useDashboard";
import NotificationPanel from "./NotificationPanel";

// Level 2: Sidebar uses notifications count AND passes everything down
function Sidebar() {
  
 const{ theme, notifications, filterPriority,  markAllAsRead, addNotification, setFilterPriority } = useDashboard();

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
        <NotificationPanel />
      </div>
    </div>
  );
}

export default Sidebar;