import { useState } from 'react';
import { useContact } from '../../contact/hooks/useContact.js';
import './ContactV2.css';

const EMPTY_FORM = { name: '', email: '', message: '' };

export default function ContactV2() {
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
    <section className="v2-contact">
      <div className="v2-contact-inner">

        <div className="v2-contact-header">
          <span className="v2-contact-index">04</span>
          <div className="v2-contact-header-rule" />
          <span className="v2-contact-label">Contact</span>
        </div>

        <div className="v2-contact-grid">
          <div className="v2-contact-left">
            <h2 className="v2-contact-title">Get In<br />Touch</h2>
            <p className="v2-contact-sub">
              Have a project in mind or want to work together? Feel free to reach out.
            </p>
            <div className="v2-contact-details">
              <div className="v2-contact-detail">
                <span className="v2-contact-detail-label">Email</span>
                <a href="mailto:tobia166@gmail.com" className="v2-contact-detail-value">tobia166@gmail.com</a>
              </div>
              <div className="v2-contact-detail">
                <span className="v2-contact-detail-label">Phone</span>
                <a href="tel:+639569366091" className="v2-contact-detail-value">+63 956 936 6091</a>
              </div>
              <div className="v2-contact-detail">
                <span className="v2-contact-detail-label">Response</span>
                <span className="v2-contact-detail-value v2-contact-response">⚡ Within 24 hours</span>
              </div>
            </div>
            <div className="v2-contact-socials">
              <a href="https://github.com/FreeFurio" target="_blank" rel="noreferrer" className="v2-contact-social">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/lance-tobia-90aaa7310/" target="_blank" rel="noreferrer" className="v2-contact-social">LinkedIn ↗</a>
              <a href="https://www.facebook.com/reeonlance.tobia" target="_blank" rel="noreferrer" className="v2-contact-social">Facebook ↗</a>
            </div>
          </div>

          <form className="v2-contact-form" onSubmit={handleSubmit}>
            {success && <p className="v2-contact-success">Message sent! I'll get back to you soon.</p>}
            {error && <p className="v2-contact-error">{error}</p>}
            <div className="v2-contact-field">
              <label htmlFor="v2-name">Name</label>
              <input id="v2-name" name="name" type="text" value={form.name} onChange={handleChange} required />
            </div>
            <div className="v2-contact-field">
              <label htmlFor="v2-email">Email</label>
              <input id="v2-email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="v2-contact-field">
              <label htmlFor="v2-message">Message</label>
              <textarea id="v2-message" name="message" rows={4} value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="v2-contact-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
