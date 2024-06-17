import React from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const Widget = ({ headerName, messages, onSend, chatId}) => {
  return (
    <ChatContainer>
      <ChatHeader>
        <div className="header-content">
          <h3>{headerName}</h3>
        </div>
      </ChatHeader>
      <ChatMessages messages={messages} onSend={onSend} chatId={chatId}/>
      <ChatInput handleSendMsg={onSend} />
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  max-height: 450px;
  font-family: 'Be Vietnam Pro', sans-serif;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #ff7290;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .header-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    h3 {
      margin: 0 0 0 1rem;
      font-size: 1rem;
    }
  }
`;

export default Widget;