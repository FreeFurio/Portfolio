import { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi.js';
import './AdminForm.css';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getMessages()
      .then((res) => setMessages(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return;
    await adminApi.deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  if (loading) return <p className="admin-state">Loading...</p>;

  return (
    <div>
      {messages.length === 0 ? (
        <p className="admin-state">No messages yet.</p>
      ) : (
        <div className="admin-messages">
          {messages.map((m) => (
            <div key={m.id} className="admin-message">
              <div className="admin-message-header">
                <span className="admin-message-name">{m.name}</span>
                <span className="admin-message-email">{m.email}</span>
                <span className="admin-message-date">{new Date(m.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="admin-message-body">{m.message}</p>
              <button className="admin-delete" onClick={() => handleDelete(m.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
