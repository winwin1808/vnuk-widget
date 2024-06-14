import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 0.5rem;
  align-items: center;
  min-height: 100%;
  width: 100%;
  background-color: #ffffff;
  .input-container {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      width: 90%;
      height: 50%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 0.8rem;

      &::selection {
        background-color: #FF9AB2;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #770000;
      border: none;
      svg {
        font-size: 1rem;
        color: white;
      }
      &:hover {
        background-color: #ff7290;
    }
    }
    
    }
  
`;
