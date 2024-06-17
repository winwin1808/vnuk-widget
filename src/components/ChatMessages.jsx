import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa6';
import { sendCustomerRating } from '../services/apiService';

const ChatMessages = ({ messages, onSend, chatId }) => {
  const scrollRef = useRef();
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showRatingInput]);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendCustomerRating(chatId, rating, content);
      const ratingMessage = `Rating: ${rating} stars, Review: ${content}`;
      onSend(ratingMessage);
      setRating(0);
      setContent('');
      setShowRatingInput(false);
    } catch (error) {
      console.error('Error sending rating:', error);
    }
  };

  return (
    <Messages>
      {messages.map((msg) => (
        <div ref={scrollRef} key={msg._id}>
          {msg.message === 'RATING_REQUEST' ? (
            <div className={`message ${msg.fromSelf ? 'sended' : 'received'}`}>
              <div className="content">
                <StyledButton onClick={() => setShowRatingInput(true)} disabled={msg.fromSelf}>
                  {msg.fromSelf ? 'Rating sent' : 'Rating here!'}
                </StyledButton>
                <div className="time">{msg.time}</div>
              </div>
            </div>
          ) : (
            <div className={`message ${msg.fromSelf ? 'sended' : 'received'}`}>
              <div className="content">
                <p>{msg.message}</p>
                <div className="time">{msg.time}</div>
              </div>
            </div>
          )}
        </div>
      ))}
      {showRatingInput && (
        <div className="message rating-input" ref={scrollRef}>
          <form onSubmit={handleSubmit}>
            <div className="rate">
              {[...Array(5)].map((_, index) => {
                const starValue = 5 - index;
                return (
                  <React.Fragment key={starValue}>
                    <input
                      type="radio"
                      id={`star${starValue}`}
                      name="rate"
                      value={starValue}
                      checked={rating === starValue}
                      onChange={handleRatingChange}
                    />
                    <label htmlFor={`star${starValue}`} title={`${starValue} stars`}>
                      <FaStar />
                    </label>
                  </React.Fragment>
                );
              })}
            </div>
            <StyledTextarea
              placeholder="Write your review..."
              value={content}
              onChange={handleContentChange}
              required
            />
            <ButtonContainer>
              <StyledButton type="submit">Submit rating</StyledButton>
            </ButtonContainer>
          </form>
        </div>
      )}
    </Messages>
  );
};

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
      margin: 0;
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
  .rating-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 55%;
    background-color: #eeeeee;
    border-radius: 0.5rem;
    padding: 0.5rem;
    .rate {
      display: flex;
      justify-content: center;
      margin-bottom: 0.5rem;
      flex-direction: row-reverse;
    }
    input[type='radio'] {
      display: none;
    }
    label {
      cursor: pointer;
      font-size: 30px;
      color: #ccc;
      direction: ltr;
    }
    input:checked ~ label {
      color: #ffc700;
    }
    label:hover,
    label:hover ~ label,
    input:checked ~ label,
    input:checked ~ label ~ label {
      color: #ffc700;
    }
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #770000;
  resize: none;
  font-family: 'Be Vietnam Pro', sans-serif;
  outline: none;

  &:focus {
    border: 1px solid #770000;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #770000;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Be Vietnam Pro', sans-serif;

  &:hover {
    background-color: #b63e3e;
  }

  &:disabled {
    background-color: #770000;
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export default ChatMessages;