import { useState } from 'react';
import { useContact } from '../hooks/useContact.js';
import './ContactSection.css';

const EMPTY_FORM = { name: '', email: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const { submit, loading, success, error } = useContact();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await submit(form);
    setForm(EMPTY_FORM);
  }

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="section-header">
          <p className="section-number">04. Contact</p>
          <h2 className="section-title">Get In Touch</h2>
        </div>
        <div className="contact-layout">
          <div className="contact-info">
            <p className="contact-info-text">
              Have a project in mind or want to work together? Feel free to reach out.
            </p>
            <div className="contact-details">
              <span className="contact-detail-label">Email</span>
              <a href="mailto:tobia166@gmail.com" className="contact-detail-value">
                tobia166@gmail.com
              </a>
            </div>
            <div className="contact-details">
              <span className="contact-detail-label">Phone</span>
              <a href="tel:+639569366091" className="contact-detail-value">
                +63 956 936 6091
              </a>
            </div>
            <div className="contact-socials">
              <a href="https://github.com/FreeFurio" target="_blank" rel="noreferrer" className="contact-social-link">GitHub</a>
              <a href="https://www.linkedin.com/in/lance-tobia-90aaa7310/" target="_blank" rel="noreferrer" className="contact-social-link">LinkedIn</a>
              <a href="https://www.facebook.com/reeonlance.tobia" target="_blank" rel="noreferrer" className="contact-social-link">Facebook</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            {success && <p className="contact-success">Message sent! I'll get back to you soon.</p>}
            {error && <p className="contact-error">{error}</p>}
            <div className="contact-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="contact-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
