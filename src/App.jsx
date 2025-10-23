
import Dashboard from './components/Dashboard';
import { DashboardProvider } from './context/DashboardProvider';

// Top level component
function App() {
  

  return (
    <DashboardProvider>
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <Dashboard />
    </div>
    </DashboardProvider>
  );
}
export default App;
