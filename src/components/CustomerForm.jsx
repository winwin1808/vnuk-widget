import React, { useState } from 'react';
import styled from 'styled-components';

const CustomerForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, phone);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Your Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <button type="submit">Start Chat</button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  height: 500px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  
  input {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #770000;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #ff7290;
    }
  }
`;

export default CustomerForm;