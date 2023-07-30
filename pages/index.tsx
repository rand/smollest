```tsx
import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import { SubscribeForm } from '../components/SubscribeForm';

const IndexPage: NextPage = () => {
  const handleSubmit = async (email: string) => {
    try {
      await axios.post('/api/subscribe', { email });
      alert('Successfully subscribed!');
    } catch (error) {
      console.error(error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div>
      <h1>Welcome to Next.js App</h1>
      <p>Build a modern web application using the Next.js framework, based on the content at <a href="https://cheshire.ai">https://cheshire.ai</a>.</p>
      <SubscribeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default IndexPage;
```