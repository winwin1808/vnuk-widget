import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { host } from '../utils/ApiRoutes';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    const customerId = localStorage.getItem('customerId');
    if (customerId) {
      setSocketCustomerId(customerId);
    }
  }, []);
  
  const setSocketCustomerId = (customerId) => {
    if (customerId) {
      // Initialize socket connection
      const newSocket = io(host, {
        query: {
          userId: customerId, // Correctly set the userId as a string
        },
        withCredentials: true,
      });

      setSocket(newSocket);

      // Clean up the socket when the component unmounts or customerId changes
      return () => {
        newSocket.close();
        setSocket(null);
      };
    }
  };

  return (
    <SocketContext.Provider value={{ socket, setSocketCustomerId }}>
      {children}
    </SocketContext.Provider>
  );
};
