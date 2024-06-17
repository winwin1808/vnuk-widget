import React from 'react';
import { WidgetProvider } from '../components/WidgetProvider';

const ChatPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat with Support</h1>
      <WidgetProvider greeting="Welcome to our support chat!" adminId="6662d81cb135cb33a0f8e32c" headerName="Customer Support" />
    </div>
  );
};

export default ChatPage;
