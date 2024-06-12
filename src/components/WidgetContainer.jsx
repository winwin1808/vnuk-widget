import React, { useState, useEffect } from "react";
import { Widget } from "./Widget";
import { nanoid } from "nanoid";
import axios from "axios";
import { sendMessageRoute } from '../utils/ApiRoutes';

export const WidgetContainer = ({ license = "", greeting = "Hello" }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (greeting && messages.length === 0) {
      setMessages([
        {
          _id: nanoid(),
          message: greeting,
          sender: "remote",
          direction: "incoming",
        },
      ]);
    }
  }, [greeting, messages]);

  const handleSend = async (message) => {
    const userMessage = {
      _id: nanoid(),
      message,
      sender: "me",
      direction: "outgoing",
    };

    const echoMessage = {
      _id: nanoid(),
      message: `ECHO: ${message}`,
      sender: "remote",
      direction: "incoming",
    };

    setMessages([...messages, userMessage, echoMessage]);

    // Send the message to the backend
    try {
      await axios.post(`${sendMessageRoute}/sendMessage`, {
        message,
        sender: "me",
        direction: "outgoing",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return <Widget messages={messages} onSend={handleSend} />;
};
