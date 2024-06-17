import React from 'react';
import { SocketContextProvider } from './context/socket';
import WidgetContainer from './components/WidgetContainer';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat with Support</h1>
      <SocketContextProvider>
        <WidgetContainer greeting="Welcome to our support chat!" adminId="6662d81cb135cb33a0f8e32c" headerName="Customer Support" />
    </SocketContextProvider>
    </div>
  );
};

export default App;
