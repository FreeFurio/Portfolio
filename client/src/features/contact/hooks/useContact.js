import { useState } from 'react';
import { sendMessage } from '../services/contactApi.js';

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function submit(data) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await sendMessage(data);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, success, error };
}
