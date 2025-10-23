import { DashboardContext } from "../context/DashboardProvider";
import useDashboard from "../context/useDashboard";
import Sidebar from "./Sidebar";

// Level 1: Dashboard uses theme for styling AND passes everything down
function Dashboard() {
//{ theme, notifications, isCollapsed, filterPriority, toggleThemeColor, changeFontSize, toggleBorderRadius, changeAnimationSpeed, markAsRead, markAllAsRead, deleteNotification, addNotification, setIsCollapsed, setFilterPriority }
  const{theme,isCollapsed , setIsCollapsed} = useDashboard(DashboardContext);
  // console.log(notifications);

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
        <Sidebar />
      )}
    </div>
  );
}
export default Dashboard;