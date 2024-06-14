import axios from 'axios';
import { initiateChatRoute, sendCustomerMessageRoute, receiveCustomerMessageRoute } from '../utils/ApiRoutes';

// Initialize customer chat
export const initializeCustomerChat = async (name, phone, admin) => {
  const response = await axios.post(initiateChatRoute, {
    name,
    phone,
    admin,
  });
  return response.data;
};

// Fetch customer messages
export const fetchCustomerMessages = async (conversationId) => {
  const response = await axios.post(`${receiveCustomerMessageRoute}/${conversationId}`);
  return response.data;
};

// Send customer message
export const sendCustomerMessage = async (sender, message, adminId) => {
  await axios.post(`${sendCustomerMessageRoute}/${sender}`, { message, adminId });
};
