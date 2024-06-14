import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';

const ChatMessages = ({ messages, openRatingModal }) => {
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Messages>
      {messages.map((msg) => (
        <div ref={scrollRef} key={msg._id}>
          {msg.message === "RATING_REQUEST" ? (
            <div className={`message ${msg.fromSelf  ? 'sended' : 'received'}`}>
              <div className="content">
                <StyledButton onClick={() => openRatingModal()} disabled={msg.fromSelf }>
                  {msg.fromSelf  ? 'Rating sent' : 'Rating here!'}
                </StyledButton>
                <div className="time">{msg.time}</div>
              </div>
            </div>
          ) : (
            <div className={`message ${msg.fromSelf  ? 'sended' : 'received'}`}>
              <div className="content">
                <p>{msg.message}</p>
                <div className="time">{msg.time}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </Messages>
  );
};

export const Widget = ({ remoteName = "TestTest", messages = [], onSend }) => {
  return (
    <ChatContainer>
      <ChatHeader>
        <div className="header-content">
            <h3>{remoteName}</h3>
        </div>
      </ChatHeader>
      <ChatMessages messages={messages} openRatingModal={() => {}} />
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

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ccc;
      border-radius: 0.25rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0 0.5rem;
    .content {
      max-width: 60%;
      overflow-wrap: break-word;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: #e0e0e0;
      font-size: 0.9rem;
      margin: 0
      .time {
        font-size: 0.5rem;
        color: #888;
        margin-top: 0.1rem;
      }
    }
  }
  .sended .content {
    background-color: #770000;
    color: white;
    margin-left: auto;
  }
  .received .content {
    background-color: #eee;
    color: black;
  }
`;

const StyledButton = styled.button`
  padding: 0.2rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #770000;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 0.6rem;

  &:hover {
    background-color: #ff7290;
  }

  &:disabled {
    background-color: #770000;
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;
