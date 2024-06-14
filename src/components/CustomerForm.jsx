import React, { useState } from 'react';
import styled from 'styled-components';

export const CustomerForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, phone);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="tel" 
        placeholder="Your Phone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        required 
      />
      <button type="submit">Start Chat</button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 100%;
    max-width: 300px;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #770000;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff7290;
    }
  }
`;
