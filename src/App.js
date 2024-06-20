import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketContextProvider } from './context/socket';
import WidgetContainer from './components/WidgetContainer';

// Helper function to get query parameters
const useQuery = () => {
  return new URLSearchParams(window.location.search);
};

const App = () => {
  const query = useQuery();
  const adminId = query.get('adminId');
  const greeting = query.get('greeting');
  const headerName = query.get('headerName');

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <SocketContextProvider>
          <WidgetContainer
            greeting={greeting}
            adminId={adminId}
            headerName={headerName}
          />
        </SocketContextProvider>
      </div>
    </Router>
  );
};

export default App;
