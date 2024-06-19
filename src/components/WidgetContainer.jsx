import React, { useState, useEffect, useCallback } from 'react';
import Widget from './Widget';
import CustomerForm from './CustomerForm';
import { useSocketContext } from '../context/socket';
import { initializeCustomerChat, fetchCustomerMessages, sendCustomerMessage, getStatusConversation } from '../services/apiService';
import moment from 'moment';
import styled from 'styled-components';

const WidgetContainer = ({ greeting, adminId, headerName }) => {
  const { socket } = useSocketContext();
  const [isChatInitialized, setIsChatInitialized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [customerId, setCustomerId] = useState(localStorage.getItem('customerId'));
  const [conversationId, setConversationId] = useState(localStorage.getItem('conversationId'));

  const fetchMessages = useCallback(async (conversationId, customerId) => {
    try {
      const initialMessages = await fetchCustomerMessages(conversationId);
      const mappedMessages = initialMessages.length > 0 ? initialMessages.map((message) => ({
        ...message,
        fromSelf: customerId === message.sender,
        time: moment(message.createdAt).format('LT'),
      })) : [{ _id: '1', message: greeting, sender: 'system', fromSelf: false, time: moment().format('LT') }];
      setMessages(mappedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [greeting]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...message,
          fromSelf: message.sender === customerId,
          time: moment(message.createdAt).format('LT'),
        }
      ]);
    };

    socket.on('newCustomerMessage', handleNewMessage);
    socket.on('newAgentMessage', handleNewMessage);
    socket.on('messageSentConfirmation', handleNewMessage);

    return () => {
      socket.off('newCustomerMessage', handleNewMessage);
      socket.off('newAgentMessage', handleNewMessage);
      socket.off('messageSentConfirmation', handleNewMessage);
    };
  }, [socket, customerId]);

  useEffect(() => {
    const checkAndInitializeChat = async () => {
      if (!customerId || !conversationId) {
        setIsChatInitialized(false);
        return;
      }

      try {
        const result = await getStatusConversation(conversationId);
        if (result.isDone) {
          clearLocalStorage();
          // Assuming the user will fill the form again
        } else {
          await fetchMessages(conversationId, customerId);
          setIsChatInitialized(true);
        }
      } catch (error) {
        clearLocalStorage();
        setIsChatInitialized(false);
      }
    };

    checkAndInitializeChat();
  }, [conversationId, customerId, fetchMessages]);

  const handleFormSubmit = async (name, phone) => {
    try {
      const result = await initializeCustomerChat(name, phone, adminId);
      if (result.customerId && result.conversationId) {
        const { customerId, conversationId } = result;
        setLocalStorage(customerId, conversationId);
        setCustomerId(customerId);
        setConversationId(conversationId);
        setIsChatInitialized(true);
        await fetchMessages(conversationId, customerId);
      } else {
        clearLocalStorage();
        setIsChatInitialized(false);
      }
    } catch (error) {
      clearLocalStorage();
      setIsChatInitialized(false);
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
      await fetchMessages(conversationId, customerId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        clearLocalStorage();
        setIsChatInitialized(false);
      } else {
        console.error('Error sending message:', error);
      }
    }
  };

  const setLocalStorage = (customerId, conversationId) => {
    localStorage.setItem('customerId', customerId);
    localStorage.setItem('conversationId', conversationId);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('customerId');
    localStorage.removeItem('conversationId');
    setCustomerId(null);
    setConversationId(null);
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
  background-color: #ffffff;
  border-radius: 1rem;
`;

export default WidgetContainer;
