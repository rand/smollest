```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SubscribeForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: { email: string }) => {
    try {
      await axios.post('/api/subscribe', data);
      toast.success('Successfully subscribed!');
      reset();
    } catch (error) {
      toast.error('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <Button type="submit">Subscribe</Button>
    </Form>
  );
};

export default SubscribeForm;
```