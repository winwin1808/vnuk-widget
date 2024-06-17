import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import CustomerForm from './CustomerForm';
import { useSocketContext } from '../context/socket';
import { initializeCustomerChat, fetchCustomerMessages, sendCustomerMessage } from '../services/apiService';
import moment from 'moment';
import styled from 'styled-components';

const WidgetContainer = ({ greeting, adminId, headerName }) => {
  const { socket } = useSocketContext();
  const [isChatInitialized, setIsChatInitialized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [customerId, setCustomerId] = useState(localStorage.getItem('customerId'));
  const [conversationId, setConversationId] = useState(localStorage.getItem('conversationId'));

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (message.sender !== customerId) {
        setMessages((prevMessages) => [...prevMessages, {
          ...message,
          fromSelf: false,
          time: moment(message.createdAt).format('LT'),
        }]);
      }
    };

    const handleSentConfirmation = (message) => {
      if (message.sender === customerId) {
        setMessages((prevMessages) => [...prevMessages, {
          ...message,
          fromSelf: true,
          time: moment(message.createdAt).format('LT'),
        }]);
      }
    };

    socket.on('newCustomerMessage', handleNewMessage);
    socket.on('messageSentConfirmation', handleSentConfirmation);

    return () => {
      socket.off('newCustomerMessage', handleNewMessage);
      socket.off('messageSentConfirmation', handleSentConfirmation);
    };
  }, [socket, customerId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId) {
        try {
          const initialMessages = await fetchCustomerMessages(conversationId);
          if (initialMessages.length > 0) {
            const mappedMessages = initialMessages.map((message) => ({
              ...message,
              fromSelf: customerId === message.sender,
              time: moment(message.createdAt).format('LT'),
            }));
            setMessages(mappedMessages);
          } else {
            setMessages([{ _id: '1', message: greeting, sender: 'system', fromSelf: false, time: moment().format('LT') }]);
          }
          setIsChatInitialized(true);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [conversationId, customerId, greeting]);

  const handleFormSubmit = async (name, phone) => {
    try {
      const { customerId, conversationId } = await initializeCustomerChat(name, phone, adminId);
      setCustomerId(customerId);
      setConversationId(conversationId);
      localStorage.setItem('customerId', customerId);
      localStorage.setItem('conversationId', conversationId);
      setIsChatInitialized(true);
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const handleSend = async (message) => {
    const newMessage = { 
      _id: Date.now().toString(), 
      message, 
      sender: customerId, 
      fromSelf: true, 
      time: moment().format('LT') 
    };

    if (socket) {
      socket.emit('sendMessage', { ...newMessage, receiver: adminId });
    }

    try {
      await sendCustomerMessage(conversationId, message, customerId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!isChatInitialized) {
    return <CustomerForm onSubmit={handleFormSubmit} />;
  }

  return (
    <Container>
      <Widget headerName={headerName} messages={messages} onSend={handleSend} chatId={conversationId}/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: 'Be Vietnam Pro', sans-serif;
`;

export default WidgetContainer;
