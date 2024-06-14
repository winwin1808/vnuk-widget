import React, { useState } from "react";
import { Widget } from "./Widget";
import { nanoid } from "nanoid";
import { initializeCustomerChat, fetchCustomerMessages, sendCustomerMessage } from "../services/apiService";
import { CustomerForm } from "./CustomerForm";
import styled from "styled-components";
import moment from "moment";
export const WidgetContainer = ({ license = "", greeting = "Hello", adminId = "6662d81cb135cb33a0f8e32c" }) => {
  const [customerId, setCustomerId] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isChatInitialized, setIsChatInitialized] = useState(false);

  const handleFormSubmit = async (name, phone) => {
    try {
      const { customerId, conversationId } = await initializeCustomerChat(name, phone, adminId);
      setCustomerId(customerId);
      setConversationId(conversationId);

      // Fetch initial messages after setting conversationId
      const initialMessages = await fetchCustomerMessages(conversationId);
      if (initialMessages.length > 0) {
        const mappedMessages = initialMessages.map((message) => ({
          ...message,
          fromSelf: customerId === message.sender,
          time: moment(message.createdAt).format('LT'),
        }));
        setMessages(mappedMessages);
      } else {
        setMessages([{ 
          _id: nanoid(), 
          message: greeting, 
          sender: "system", 
          fromSelf: false, 
          time: moment().format('LT') 
        }]);
      }

      setIsChatInitialized(true);
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  const handleSend = async (message) => {
    const newMessage = {
      _id: nanoid(),
      message,
      sender: customerId,
      fromSelf: true,
      time: moment().format('LT'),
    };

    setMessages([...messages, newMessage]);

    try {
      await sendCustomerMessage(conversationId, message, customerId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container>
      {!isChatInitialized ? (
        <CustomerForm onSubmit={handleFormSubmit} />
      ) : (
        <Widget messages={messages} onSend={handleSend} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
