import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SocketProvider } from '../context/socket';
import WidgetContainer from './WidgetContainer';

const WidgetProvider = ({ greeting, adminId, headerName }) => {
  return (
    <SocketProvider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<WidgetContainer greeting={greeting} adminId={adminId} headerName={headerName} />} />
        </Routes>
      </MemoryRouter>
    </SocketProvider>
  );
};

export default WidgetProvider;
