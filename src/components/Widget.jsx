import React from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const Widget = ({ headerName, messages, onSend, chatId }) => {
  return (
    <ChatContainer>
      <ChatHeader>
        <div className="header-content">
          <h3>{headerName}</h3>
        </div>
      </ChatHeader>
      <ChatMessagesContainer>
        <ChatMessages messages={messages} onSend={onSend} chatId={chatId}/>
      </ChatMessagesContainer>
      <ChatInputContainer>
        <ChatInput handleSendMsg={onSend} />
      </ChatInputContainer>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  width: 100%;
  height: 100%;
  max-height: 550px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Be Vietnam Pro', sans-serif;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff7290;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 0.5rem;

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

const ChatMessagesContainer = styled.div`
  overflow-y: auto;
`;

const ChatInputContainer = styled.div`
  padding: 0.5rem;
  background-color: #f1f1f1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export default Widget;