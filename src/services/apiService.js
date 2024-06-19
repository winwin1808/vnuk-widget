import axios from 'axios';
import { 
  initiateChatRoute, 
  sendCustomerMessageRoute, 
  receiveCustomerMessageRoute,
  sendRatingCustomerMessageRoute,
  conversationStatusRoute
} from '../utils/ApiRoutes';

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

export const sendCustomerRating = async (chatId, rating, content) => {
  await axios.post(`${sendRatingCustomerMessageRoute}/${chatId}`, { star: rating, content });
};

export const getStatusConversation = async (conversationId) => {
  const response = await axios.get(`${conversationStatusRoute}/${conversationId}`);
  return response.data;
};