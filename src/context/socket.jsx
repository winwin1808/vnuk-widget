import React, { createContext, useState, useContext } from 'react';
import io from 'socket.io-client';
import { host } from '../utils/ApiRoutes';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    const setSocketCustomerId = (customerId) => {
        if (customerId) {
            // Initialize socket connection
            const socket = io(host, {
                query: {
                    userId: customerId, // Correctly set the userId as a string
                },
                withCredentials: true,
            });

            setSocket(socket);

            // Clean up the socket when the component unmounts or customerId changes
            return () => {
                socket.close();
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
